import {NextResponse} from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"


export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
    try {
        await verifyToken(token)
        return NextResponse.next()
    } catch (error) {
        console.error("Error verifying token:", error)
        return NextResponse.redirect(new URL("/login", req.url))
    }
}

export const config = {
    matcher: ["/profile", "/create-post","/myposts"],
}