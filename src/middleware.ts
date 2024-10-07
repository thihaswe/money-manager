import { NextRequest, NextResponse } from "next/server";
// import { auth as middleware } from "@/lib/auth";

import NextAuth from "next-auth";

import authConfig from "./lib/auth.config";

const { auth } = NextAuth(authConfig);
// export const { auth: middleware } = NextAuth(authConfig);

// export default auth(async function middleware(req: NextRequest) {
//   // Your custom middleware logic goes here

//   //authentication
//   const auth = req.auth;
//   const pathname = req.nextUrl.pathname;
//   if (!auth && pathname !== "login" && pathname !== "register") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   //adding pathname to the headers
//   const headers = new Headers(req.headers);
//   headers.set("x-current-path", req.nextUrl.pathname);
//   return NextResponse.next({
//     request: {
//       headers: headers,
//     },
//   });
// });

export default auth(async function middleware(req: NextRequest) {
  // const isAuthenticated = req.auth;
  const pathname = req.nextUrl.pathname;

  const isAuth = req.cookies.get("authjs.session-token");

  // Redirect if not authenticated and not on login or register page
  if (
    !isAuth &&
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Add current path to the request headers
  const headers = new Headers(req.headers);
  headers.set("x-current-path", pathname);

  // Proceed to next middleware or route handler
  return NextResponse.next({
    request: {
      headers: headers,
    },
  });
});

// export default middleware((request: NextRequest) => {
//   // console.log("hte request id ", request.auth);
//   // if (!request.auth && request.nextUrl.pathname === "/record") {
//   //   return NextResponse.redirect(new URL("/", request.url));
//   // }

//   const headers = new Headers(request.headers);
//   headers.set("x-current-path", request.nextUrl.pathname);
//   return NextResponse.next({
//     request: {
//       headers: headers,
//     },
//   });
// });

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
