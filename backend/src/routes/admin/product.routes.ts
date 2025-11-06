import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../config/database';

const router = Router();

// Helper function
const slugify = (text: string): string => {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
  };
  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  sku: z.string().min(1),
  price: z.number().min(0),
  comparePrice: z.number().optional(),
  cost: z.number().optional(),
  stock: z.number().int().min(0),
  lowStockAlert: z.number().int().min(0).default(10),
  categoryId: z.string().min(1),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  weight: z.number().optional(),
  dimensions: z.any().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// GET /api/admin/products - List all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '20', search, categoryId, isActive } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          priceRules: true,
          _count: { select: { orderItems: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit as string),
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Admin get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/admin/products - Create product
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);

    // Check SKU uniqueness
    const existingSku = await prisma.product.findUnique({
      where: { sku: validatedData.sku },
    });

    if (existingSku) {
      return res.status(400).json({ error: 'SKU already exists' });
    }

    // Generate unique slug
    let slug = slugify(validatedData.name);
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${slugify(validatedData.name)}-${counter}`;
      counter++;
    }

    const product = await prisma.product.create({
      data: { ...validatedData, slug },
      include: { category: true },
    });

    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/admin/products/:id - Update product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.partial().parse(req.body);

    const existingProduct = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let slug = existingProduct.slug;
    if (validatedData.name && validatedData.name !== existingProduct.name) {
      slug = slugify(validatedData.name);
      let counter = 1;
      while (
        await prisma.product.findFirst({
          where: { slug, id: { not: req.params.id } },
        })
      ) {
        slug = `${slugify(validatedData.name)}-${counter}`;
        counter++;
      }
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { ...validatedData, slug },
      include: { category: true, priceRules: true },
    });

    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { orderItems: true } } },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product._count.orderItems > 0) {
      await prisma.product.update({
        where: { id: req.params.id },
        data: { isActive: false },
      });
      return res.json({ message: 'Product deactivated (has orders)' });
    }

    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
