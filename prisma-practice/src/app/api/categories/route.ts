import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const categories = await prisma.category.findMany()
        return Response.json({
            success: true,
            categories: categories
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error fetching categories",
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 })
    }
}