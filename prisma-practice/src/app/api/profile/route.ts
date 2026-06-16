import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth-middleware"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateProfileSchema = z.object({
    fullname: z.string().min(1).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
})

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        if (!token) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        const user = await getUserFromToken(token)
        if (!user) {
            return Response.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const parsed = updateProfileSchema.safeParse(body)
        if (!parsed.success) {
            return Response.json({ success: false, message: "Invalid input", errors: z.treeifyError(parsed.error) }, { status: 400 })
        }

        const updateData: Partial<{ fullname: string; email: string; password: string }> = {}
        if (parsed.data.fullname) updateData.fullname = parsed.data.fullname
        if (parsed.data.email) {
            const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } })
            if (existing && existing.id !== user.userId) {
                return Response.json({ success: false, message: "Email already in use" }, { status: 400 })
            }
            updateData.email = parsed.data.email
        }
        if (parsed.data.password) updateData.password = parsed.data.password

        const updated = await prisma.user.update({
            where: { id: user.userId },
            data: updateData,
            select: { id: true, fullname: true, email: true, profileImage: true },
        })

        return Response.json({ success: true, user: updated })
    } catch (error) {
        console.error("Error updating profile:", error)
        return Response.json({ success: false, message: "Error updating profile" }, { status: 500 })
    }
}