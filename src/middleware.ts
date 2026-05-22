import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Only this email can access the admin panel
const ADMIN_EMAIL = "thejaswinps@gmail.com";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLoginPage = createRouteMatcher(["/admin/login(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Let the login page through always
  if (isLoginPage(request)) return NextResponse.next();

  // For all other /admin/* routes, require authentication
  if (isAdminRoute(request)) {
    const { userId, sessionClaims } = await auth();

    // Not signed in at all → redirect to login
    if (!userId) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Signed in but wrong email → 403 forbidden page
    const email = (sessionClaims?.email as string) ?? "";
    if (email !== ADMIN_EMAIL) {
      const forbiddenUrl = new URL("/admin/forbidden", request.url);
      return NextResponse.redirect(forbiddenUrl);
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
