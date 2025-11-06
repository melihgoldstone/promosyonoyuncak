import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(2, "Kategori adı en az 2 karakter olmalıdır"),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return false;
  }
  return true;
}

// POST /api/admin/categories - Yeni kategori oluştur
export async function POST(req: Request) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = categorySchema.parse(body);

    // Slug oluştur
    let slug = slugify(validatedData.name);
    let finalSlug = slug;
    let counter = 1;

    // Benzersiz slug oluştur
    while (await prisma.category.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const category = await prisma.category.create({
      data: {
        ...validatedData,
        slug: finalSlug,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Kategori oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// GET /api/admin/categories - Tüm kategorileri listele
export async function GET() {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json(
      { error: "Kategoriler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
