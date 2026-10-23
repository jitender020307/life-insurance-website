import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect client portal routes
    if (path.startsWith('/client')) {
      if (!token) {
        const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url));
      }
    }

    // Protect admin routes
    if (path.startsWith('/admin')) {
      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Protect agent routes
    if (path.startsWith('/agent')) {
      if (!token || (token.role !== 'agent' && token.role !== 'admin')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Allow public access to auth pages
        if (path.startsWith('/auth')) {
          return true;
        }

        // Require auth for client portal
        if (path.startsWith('/client')) {
          return !!token;
        }

        // Allow public access to everything else
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/client/:path*',
    '/admin/:path*',
    '/agent/:path*',
    '/api/client/:path*',
    '/api/admin/:path*',
    '/api/agent/:path*',
  ],
};