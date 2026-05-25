import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLoginPage = createRouteMatcher(["/admin/login(.*)"]);
const isForbiddenPage = createRouteMatcher(["/admin/forbidden(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Let the login and forbidden pages through always
  if (isLoginPage(request) || isForbiddenPage(request)) return NextResponse.next();

  // Allow local development to bypass authentication checks
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) return NextResponse.next();

  const pathname = request.nextUrl.pathname;
  const isApiRoute = pathname.startsWith("/api/");
  const isPublicLeadSubmit = pathname === "/api/leads" && request.method === "POST";

  // Require Clerk authentication for admin pages
  if (isAdminRoute(request)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/admin/login", request.url).toString(),
    });
  }

  // Require Clerk authentication for non-public API endpoints
  if (isApiRoute && !isPublicLeadSubmit) {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
