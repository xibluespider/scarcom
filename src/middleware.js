import { NextResponse } from "next/server";
import { auth } from "./auth";

export const imiddleware = (req) => {
  const isAuthenticated = !!req.auth;
  const pathname = req.nextUrl.pathname;

  if (pathname === "/test") return NextResponse.next();

  if (pathname === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname === "/auth" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export default auth(imiddleware);

export const config = {
  matcher: ["/", "/auth", "/about", "/test"],
};
