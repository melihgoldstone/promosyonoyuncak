import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/categories - Kategorileri listele
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get("parentId");
    const includeProducts = searchParams.get("includeProducts") === "true";

    const where: any = {
      isActive: true,
    };

    if (parentId === "null") {
      where.parentId = null;
    } else if (parentId) {
      where.parentId = parentId;
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
        ...(includeProducts && {
          products: {
            where: { isActive: true },
            take: 10,
            orderBy: { createdAt: "desc" },
          },
        }),
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
