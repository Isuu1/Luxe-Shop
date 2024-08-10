import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      userId,
      sanityId,
      productName,
      productImage,
      productDescription,
      productPrice,
      productRatings,
      productStars,
    } = await req.json();

    const wishlistItem = await prisma.wishlist.create({
      data: {
        // Parsing userId to number
        userId: parseInt(userId),
        sanityId,
        productName,
        productImage,
        productPrice,
        productDescription,
        productRatings,
        productStars,
      },
    });
    return NextResponse.json({ wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json(
      { error: "Error adding to wishlist" },
      { status: 500 }
    );
  }
}
