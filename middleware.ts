import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This is a placeholder middleware - actual auth checking happens client-side
// using useAuth hook in protected layouts
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/hesabim/:path*"],
};
