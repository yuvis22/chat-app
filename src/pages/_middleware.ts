import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ['/'];

const isPublic = (path: string) => {
  return publicPaths.find(x => 
    path === x || path.startsWith(`${x}/`)
  );
}

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  const { userId } = request.auth;
  
  if (!userId) {
    const signInUrl = new URL('/', request.url);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
});

export const config = { matcher: [
  '/((?!api|_next/static|_next/image|favicon.ico).*)',
] };