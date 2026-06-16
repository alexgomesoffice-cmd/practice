import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth-middleware"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      )
    }

    const body = await request.json()

    const postId = Number(body.postId)

    if (!postId) {
      return Response.json(
        {
          success: false,
          message: "Post ID is required",
        },
        { status: 400 }
      )
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.userId,
        postId,
      },
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      })

      return Response.json({
        success: true,
        liked: false,
        message: "Post unliked",
      })
    }

    await prisma.like.create({
      data: {
        userId: user.userId,
        postId,
      },
    })

    return Response.json({
      success: true,
      liked: true,
      message: "Post liked",
    })
  } catch (error) {
    console.error("Like error:", error)

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    )
  }
}