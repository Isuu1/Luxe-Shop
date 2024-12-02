import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    // Get current product id from search params
    const { product_id } = params;
    // Get current user ID from search params
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!product_id) {
      return NextResponse.json(
        { error: "Wishlist item ID is required" },
        { status: 400 }
      );
    }
    //Delete wishlist item
    await prisma.wishlist.deleteMany({
      where: {
        sanityId: product_id,
        userId: parseInt(userId),
      },
    });
    return NextResponse.json({ message: "Wishlist item removed" });
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    return NextResponse.json(
      { error: "Error removing wishlist item" },
      { status: 500 }
    );
  }
}
