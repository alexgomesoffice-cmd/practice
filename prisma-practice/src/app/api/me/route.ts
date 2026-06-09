import {cookies} from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        const cookieStore = await cookies()
        const token =  cookieStore.get("token")?.value
        if (!token) {
            return Response.json({
                loggedIn: false,
                user: null,
            })
        }

        const payload = await verifyToken(token) as { userId: number }
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
            select: {
                id: true,
                email: true,
            }
            })
            return Response.json({
                loggedIn: true,
                user,
            })

    } catch (error) {
        console.error("Error fetching user data:", error)
        return Response.json({
            loggedIn: false,
            user: null,
        })
    }
}