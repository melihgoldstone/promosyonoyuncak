import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/[id] - Tek ürün detayı
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
        isActive: true,
      },
      include: {
        category: true,
        priceRules: {
          orderBy: {
            minQuantity: "asc",
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json(
      { error: "Ürün yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
