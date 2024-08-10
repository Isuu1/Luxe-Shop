import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    // Get current product id from search params for testing
    const { id } = params;
    console.log("Product id remove handler: ", id);

    if (!id) {
      return NextResponse.json(
        { error: "Wishlist item ID is required" },
        { status: 400 }
      );
    }
    await prisma.wishlist.delete({
      where: { sanityId: id },
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
