import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLoginPage = createRouteMatcher(["/admin/login(.*)"]);
const isForbiddenPage = createRouteMatcher(["/admin/forbidden(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Let the login and forbidden pages through always
  if (isLoginPage(request) || isForbiddenPage(request)) return NextResponse.next();

  // For all /admin/* routes, require Clerk sign-in
  if (isAdminRoute(request)) {
    // protect() will redirect unauthenticated users to /admin/login automatically
    await auth.protect({
      unauthenticatedUrl: new URL("/admin/login", request.url).toString(),
    });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
