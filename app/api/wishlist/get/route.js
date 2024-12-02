import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Get current user ID from search params
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    console.log("User id in GET route handler:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: parseInt(userId) },
    });
    if (wishlist.length === 0) {
      console.log("There is no wishlist");
      return NextResponse.json([]);
    }

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.log("There was a problem getting data: ", error);
    NextResponse.json("There was a problem getting data: ", error);
  }
}
