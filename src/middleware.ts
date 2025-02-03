import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  // const token = await getToken({ req })

  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  })
}

// ✅ Apply middleware to all pages except static assets
export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
