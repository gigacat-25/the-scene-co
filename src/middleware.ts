import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

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

  // Check if this request needs admin protection (Admin Pages & non-public APIs)
  const needsAdminAuth = isAdminRoute(request) || (isApiRoute && !isPublicLeadSubmit);

  if (needsAdminAuth) {
    // 1. Check Authentication (Clerk session signature check)
    const session = await auth();
    if (!session.userId) {
      if (isApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // 2. Check Authorization (Email Whitelist)
    const user = await currentUser();
    const primaryEmail = user?.emailAddresses.find(
      (e) => e.id === user?.primaryEmailAddressId
    )?.emailAddress;

    const allowedAdmin = process.env.ADMIN_EMAIL || "thescene.co26@gmail.com";

    if (primaryEmail !== allowedAdmin) {
      if (isApiRoute) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/admin/forbidden", request.url));
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
