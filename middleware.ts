import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Admin olmayan kullanıcılar admin sayfalarına erişemez
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Admin routes require authentication
        if (pathname.startsWith("/admin")) {
          return !!token;
        }

        // Hesabım routes require authentication
        if (pathname.startsWith("/hesabim")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/hesabim/:path*"],
};
