import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Temporary bypass: No login required until Clerk is implemented.
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
