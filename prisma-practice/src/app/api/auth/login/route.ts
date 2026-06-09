import {z} from "zod"
import { prisma } from "@/lib/prisma"
import { signToken } from "@/lib/jwt"


export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export async function POST (req: Request) {
    const body = await req.json()

    
    const validatedData = loginSchema.safeParse(body)
    if (!validatedData.success) {
        return Response.json({
            success: false,
            message: "Invalid input data",
            errors: z.treeifyError(validatedData.error),
        }, { status: 400 })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: validatedData.data.email
        }
    })

    if (!user || user.password !== validatedData.data.password) {
        return Response.json({
            success: false,
            message: "Invalid email or password",
        }, { status: 401 })
    }

    const token = await signToken({
        userId: user.id,
        email: user.email,
    })

    return Response.json({
        success: true,
        message: "Login successful",
        token: token,
    })
}