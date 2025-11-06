import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

// Admin ürün şeması
const productSchema = z.object({
  name: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
  description: z.string().optional(),
  sku: z.string().min(1, "SKU kodu gereklidir"),
  price: z.number().min(0, "Fiyat 0'dan küçük olamaz"),
  comparePrice: z.number().optional(),
  cost: z.number().optional(),
  stock: z.number().int().min(0, "Stok 0'dan küçük olamaz"),
  lowStockAlert: z.number().int().min(0).default(10),
  categoryId: z.string().min(1, "Kategori seçilmelidir"),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  weight: z.number().optional(),
  dimensions: z.any().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// Admin kontrolü
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return false;
  }
  return true;
}

// POST /api/admin/products - Yeni ürün oluştur
export async function POST(req: Request) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = productSchema.parse(body);

    // Slug oluştur
    const slug = slugify(validatedData.name);

    // SKU benzersizliğini kontrol et
    const existingSku = await prisma.product.findUnique({
      where: { sku: validatedData.sku },
    });

    if (existingSku) {
      return NextResponse.json(
        { error: "Bu SKU kodu zaten kullanılıyor" },
        { status: 400 }
      );
    }

    // Slug benzersizliğini kontrol et ve gerekirse sayı ekle
    let finalSlug = slug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug: finalSlug,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Ürün oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// GET /api/admin/products - Tüm ürünleri listele (admin)
export async function GET(req: Request) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const isActive = searchParams.get("isActive");

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          priceRules: true,
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get admin products error:", error);
    return NextResponse.json(
      { error: "Ürünler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
