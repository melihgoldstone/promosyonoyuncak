import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

// Admin kontrolü
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return false;
  }
  return true;
}

const productUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  sku: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  comparePrice: z.number().optional(),
  cost: z.number().optional(),
  stock: z.number().int().min(0).optional(),
  lowStockAlert: z.number().int().min(0).optional(),
  categoryId: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  weight: z.number().optional(),
  dimensions: z.any().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// PUT /api/admin/products/[id] - Ürün güncelle
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = productUpdateSchema.parse(body);

    // Mevcut ürünü kontrol et
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    // SKU değişiyorsa, benzersizliğini kontrol et
    if (validatedData.sku && validatedData.sku !== existingProduct.sku) {
      const skuExists = await prisma.product.findUnique({
        where: { sku: validatedData.sku },
      });

      if (skuExists) {
        return NextResponse.json(
          { error: "Bu SKU kodu zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    // İsim değişiyorsa slug'ı güncelle
    let slug = existingProduct.slug;
    if (validatedData.name && validatedData.name !== existingProduct.name) {
      slug = slugify(validatedData.name);

      // Slug benzersizliğini kontrol et
      let finalSlug = slug;
      let counter = 1;
      while (true) {
        const slugExists = await prisma.product.findFirst({
          where: {
            slug: finalSlug,
            id: { not: params.id },
          },
        });
        if (!slugExists) break;
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      slug = finalSlug;
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        slug,
      },
      include: {
        category: true,
        priceRules: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - Ürün sil
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    // Ürünü kontrol et
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    // Eğer siparişlerde kullanılmışsa, sadece deaktif et
    if (product._count.orderItems > 0) {
      await prisma.product.update({
        where: { id: params.id },
        data: { isActive: false },
      });

      return NextResponse.json({
        message: "Ürün siparişlerde kullanıldığı için deaktif edildi",
      });
    }

    // Tamamen sil
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Ürün başarıyla silindi" });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Ürün silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// GET /api/admin/products/[id] - Tek ürün detayı (admin)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        priceRules: {
          orderBy: {
            minQuantity: "asc",
          },
        },
        _count: {
          select: {
            orderItems: true,
            cartItems: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Get admin product error:", error);
    return NextResponse.json(
      { error: "Ürün yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
