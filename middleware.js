import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE", req.nextUrl.pathname);
  console.log("Is logged in", isLoggedIn);
  if (!req.auth && req.nextUrl.pathname.startsWith("/user")) {
    const newUrl = new URL("/auth", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/user/:path*",
  ],
};
