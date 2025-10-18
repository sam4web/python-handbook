import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/tutorials") {
    const redirectUrl = new URL("/tutorials/hello-world-program", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tutorials"],
};
