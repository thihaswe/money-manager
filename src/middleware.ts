import { NextRequest, NextResponse } from "next/server";
// import { auth as middleware } from "@/lib/auth";

import NextAuth from "next-auth";

import authConfig from "./lib/auth.config";

// export const { auth: middleware } = NextAuth(authConfig);

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
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
