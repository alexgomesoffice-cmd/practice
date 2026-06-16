import { getUserFromToken } from "@/lib/auth-middleware"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

import fs from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({

      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { fullname: true } },
        category: { select: { name: true } },
        images: { select: { imageUrl: true } },
        _count: { select: { likes: true, comments: true } },
      },
    })
    return Response.json({ success: true, posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return Response.json({ success: false, message: "Error fetching posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()

    const token = cookieStore.get("token")?.value

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      )
    }

    const user = await getUserFromToken(token)

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    const title = formData.get("title") as string
    const article = formData.get("article") as string
    const categoryId = Number(formData.get("categoryId"))

    const files = formData.getAll("images") as File[]

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    )

    await fs.mkdir(uploadDir, {
      recursive: true,
    })

    const imageUrls: string[] = []

    for (const file of files) {
      if (!file || file.size === 0) continue

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const extension =
        file.name.split(".").pop() || "jpg"

      const filename = `${randomUUID()}.${extension}`

      const filePath = path.join(
        uploadDir,
        filename
      )

      await fs.writeFile(filePath, buffer)

      imageUrls.push(`/uploads/${filename}`)
    }

    const post = await prisma.post.create({
      data: {
        title,
        article,
        categoryId,
        userId: user.userId,

        images: {
          create: imageUrls.map((url) => ({
            imageUrl: url,
          })),
        },
      },
      include: {
        images: true,
      },
    })

    return Response.json({
      success: true,
      message: "Post created successfully",
      post,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        success: false,
        message: "Error creating post",
      },
      { status: 500 }
    )
  }
}