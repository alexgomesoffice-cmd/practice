import { prisma } from "@/lib/prisma"
import { z } from "zod"


export const registerSchema = z.object({
    fullname: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})



export async function POST (req: Request) {
    const body = await req.json()

    // Validate the request body
    const validatedData = registerSchema.safeParse(body)
    if (!validatedData.success) {
        return Response.json({
            success: false,
            message: "Invalid input data",
            errors: z.treeifyError(validatedData.error),
        }, { status: 400 })
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email: validatedData.data.email,
        },
    })
    if (existingUser) {
        return Response.json({
            success: false,
            message: "User with this email already exists",
        }, { status: 400 })
    }
    
     const user = await prisma.user.create({
    data: {
    fullname: validatedData.data.fullname,
    email: validatedData.data.email,
    password: validatedData.data.password,
  },
})

    return Response.json({
        success: true,
        message: "User registered successfully",
        user,
    })
}