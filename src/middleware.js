import { NextResponse } from "next/server";
import { auth } from "./auth";

export const imiddleware = (req) => {
	const isAuthenticated = !!req.auth;
	const pathname = req.nextUrl.pathname;

	console.log(
		`[MIDDLEWARE] Request to: ${pathname}, isAuthenticated: ${isAuthenticated}`
	);

	if (pathname === "/about") {
		console.log("[MIDDLEWARE] Path is /about. Allowing.");
		return NextResponse.next();
	}

	if (pathname === "/auth" && isAuthenticated) {
		console.log(
			"[MIDDLEWARE] Path is /auth and user is authenticated. Redirecting to /."
		);
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (pathname !== "/auth" && !isAuthenticated) {
		console.log(
			"[MIDDLEWARE] Path is not /auth and user is not authenticated. Redirecting to /auth."
		);
		return NextResponse.redirect(new URL("/auth", req.url));
	}

	console.log("[MIDDLEWARE] No conditions matched. Allowing.");
	return NextResponse.next();
};

export default auth(imiddleware);

export const config = {
	matcher: ["/", "/auth", "/about", "/global", "/channel/:path*"],
};
