import { NextRequest, NextResponse } from "next/server";
import { EnumTokens, removeFromStorage } from "./services/auth-token.service";
import { setUser } from "./stores/user.store";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  const isAuthPage = url.includes('/auth')

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL('/posts', url))
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    setUser(null);
    removeFromStorage();
    return NextResponse.next();
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*']
}