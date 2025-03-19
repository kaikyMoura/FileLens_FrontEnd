import { NextRequest, NextResponse } from "next/server";
import Cookies from 'js-cookie';

export default function middleware(request: NextRequest) {
    const token = Cookies.get('Token')

    console.log(token)

    // if (token !== undefined && request.nextUrl.pathname === '/login') {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // if (!token && request.nextUrl.pathname !== 'login') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // if (!token && request.nextUrl.pathname.startsWith('/login')) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}