import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const categoryUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
});

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return false;
  }
  return true;
}

// PUT /api/admin/categories/[id] - Kategori güncelle
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
    const validatedData = categoryUpdateSchema.parse(body);

    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    // İsim değişiyorsa slug'ı güncelle
    let slug = existingCategory.slug;
    if (validatedData.name && validatedData.name !== existingCategory.name) {
      slug = slugify(validatedData.name);

      let finalSlug = slug;
      let counter = 1;
      while (true) {
        const slugExists = await prisma.category.findFirst({
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

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        slug,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Kategori güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id] - Kategori sil
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            products: true,
            children: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    if (category._count.products > 0) {
      return NextResponse.json(
        { error: "Bu kategoride ürün bulunduğu için silinemez" },
        { status: 400 }
      );
    }

    if (category._count.children > 0) {
      return NextResponse.json(
        { error: "Alt kategorisi olan kategori silinemez" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Kategori başarıyla silindi" });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Kategori silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
