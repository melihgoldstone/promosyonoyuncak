import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { z } from "zod";

const orderSchema = z.object({
  addressId: z.string().min(1, "Teslimat adresi seçilmelidir"),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      price: z.number().min(0),
    })
  ).min(1, "Sipariş en az 1 ürün içermelidir"),
  paymentMethod: z.string().default("iyzico"),
  customerNote: z.string().optional(),
});

// POST /api/orders - Yeni sipariş oluştur
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = orderSchema.parse(body);

    // Stok kontrolü ve fiyat doğrulama
    const productIds = validatedData.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "Bazı ürünler bulunamadı" },
        { status: 400 }
      );
    }

    // Stok kontrolü
    for (const item of validatedData.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: "Ürün bulunamadı" },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `${product.name} ürününde yeterli stok yok` },
          { status: 400 }
        );
      }
    }

    // Fiyat hesaplama
    const subtotal = validatedData.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const shippingCost = subtotal >= 500 ? 0 : 30; // 500 TL üzeri ücretsiz kargo
    const tax = subtotal * 0.18; // KDV %18
    const total = subtotal + shippingCost + tax;

    // Sipariş numarası oluştur
    const orderNumber = generateOrderNumber();

    // Transaction içinde sipariş oluştur
    const order = await prisma.$transaction(async (tx) => {
      // Sipariş oluştur
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: session.user.id,
          addressId: validatedData.addressId,
          status: "PENDING",
          paymentStatus: "PENDING",
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
          items: {
            include: {
              product: true,
            },
          },
          address: true,
        },
      });

      // Stokları güncelle
      for (const item of validatedData.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Sipariş oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// GET /api/orders - Kullanıcının siparişlerini listele
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Siparişler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
