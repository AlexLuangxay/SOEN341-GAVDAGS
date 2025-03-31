import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();

  // If the route is NOT public and the user is NOT signed in, redirect to sign-in
  if (!isPublicRoute(req) && !authObject.userId) {
    return authObject.redirectToSignIn();
  }
  
  return NextResponse.next(); // Continue if authenticated
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};