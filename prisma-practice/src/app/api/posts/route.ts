import { getUserFromToken } from "@/lib/auth-middleware"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"


export async function POST(request: Request) {

    try{
        const body = await request.json()
        
        const cookieStore = await cookies()
        
        const token = cookieStore.get("token")?.value
        if (!token) {
            return Response.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 })
        }

        const user = await getUserFromToken(token)
        if (!user) {
            return Response.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 })
        }

        const post = await prisma.post.create({
            data: {
                title: body.title,
                article: body.article,
                categoryId: Number(body.categoryId),
                userId: user.userId,
            }
        })
        return Response.json({
            success: true,
            message: "Post created successfully",
            post: post
        })
    } catch (error) {
        console.error('Error creating post:', error)
        return Response.json({
            success: false,
            message: "Error creating post"
        }, { status: 500 })
    }
}