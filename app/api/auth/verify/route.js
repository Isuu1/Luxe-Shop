import { NextResponse } from "next/server";
import { verifyEmailToken } from "../../../../lib/verification/email";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing verification token" },
      { status: 400 }
    );
  }

  const isVerified = await verifyEmailToken(token);

  if (!isVerified) {
    return NextResponse.json(
      { error: "Invalid verification token" },
      { status: 400 }
    );
  }

  // Create absolute URL for redirect
  const baseUrl = process.env.NEXTAUTH_URL;
  const redirectUrl = new URL("/auth/verification?verified=true", baseUrl);

  return NextResponse.redirect(redirectUrl);
}
