import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

const orderSchema = z.object({
  addressId: z.string().min(1, 'Address is required'),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      price: z.number().min(0),
    })
  ).min(1, 'At least one item required'),
  paymentMethod: z.string().default('iyzico'),
  customerNote: z.string().optional(),
});

// POST /api/orders - Create order
router.post('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const validatedData = orderSchema.parse(req.body);

    // Validate products and stock
    const productIds = validatedData.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: 'Some products not found' });
    }

    // Stock check
    for (const item of validatedData.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product?.name || 'product'}`,
        });
      }
    }

    // Calculate totals
    const subtotal = validatedData.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingCost = subtotal >= 500 ? 0 : 30;
    const tax = subtotal * 0.18;
    const total = subtotal + shippingCost + tax;

    // Generate order number
    const orderNumber = `PO${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: authReq.user!.id,
          addressId: validatedData.addressId,
          status: 'PENDING',
          paymentStatus: 'PENDING',
          paymentMethod: validatedData.paymentMethod,
          subtotal,
          shippingCost,
          tax,
          total,
          customerNote: validatedData.customerNote,
          items: {
            create: validatedData.items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              return {
                productId: item.productId,
                productName: product.name,
                productSku: product.sku,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity,
              };
            }),
          },
        },
        include: {
          items: { include: { product: true } },
          address: true,
        },
      });

      // Update stock
      for (const item of validatedData.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders - List user orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const orders = await prisma.order.findMany({
      where: { userId: authReq.user!.id },
      include: {
        items: { include: { product: true } },
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        userId: authReq.user!.id,
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

export default router;
