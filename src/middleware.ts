import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('Token')

    console.log(token)

    // if (token && request.nextUrl.pathname === '/login') {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // if (!token && request.nextUrl.pathname.startsWith('/')) {
    //     return NextResponse.redirect(new URL('/login', request.url))
    // }

    return NextResponse.next()
}