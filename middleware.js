import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE", req.nextUrl.pathname);
  console.log("Is logged in", isLoggedIn);
  if (!req.auth && req.nextUrl.pathname === "/user") {
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

// export default auth((req) => {
//   const reqUrl = new URL(req.url);
//   if (!req.auth && reqUrl?.pathname !== "/") {
//     return NextResponse.redirect(
//       new URL(
//         `/auth?callbackUrl=${encodeURIComponent(reqUrl?.pathname)}`,
//         req.url
//       )
//     );
//   }
// });
