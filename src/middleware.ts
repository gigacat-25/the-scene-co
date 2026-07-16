import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLoginPage = createRouteMatcher(["/admin/login(.*)"]);
const isForbiddenPage = createRouteMatcher(["/admin/forbidden(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const requestHeaders = new Headers(request.headers);
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");
  if (isAdmin) {
    requestHeaders.set("x-is-admin", "true");
  }

  // Let the login and forbidden pages through always
  if (isLoginPage(request) || isForbiddenPage(request)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  }

  // Allow local development to bypass authentication checks
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  }

  const pathname = request.nextUrl.pathname;
  const isApiRoute = pathname.startsWith("/api/");
  const isPublicLeadSubmit = pathname === "/api/leads" && request.method === "POST";
  const isPublicMedia = pathname.startsWith("/api/media/") && request.method === "GET";

  // Require Clerk authentication for admin pages
  if (isAdminRoute(request)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/admin/login", request.url).toString(),
    });
  }

  // Require Clerk authentication for non-public API endpoints
  if (isApiRoute && !isPublicLeadSubmit && !isPublicMedia) {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
});

export const config = {
  matcher: [
    "/admin(.*)",
    "/api(.*)",
  ],
};
