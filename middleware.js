import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

//Middleware have to expose desktop layout phone image path
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
