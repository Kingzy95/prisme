import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const articleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  categoryId: z.string().min(1),
  published: z.boolean().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = articleSchema.parse(json)

    const article = await db.article.create({
      data: {
        title: body.title,
        content: body.content,
        categoryId: body.categoryId,
        authorId: session.user.id,
        published: body.published ?? false,
        slug: body.title.toLowerCase().replace(/ /g, "-"),
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId")
    const page = Number.parseInt(searchParams.get("page") ?? "1")
    const limit = Number.parseInt(searchParams.get("limit") ?? "10")
    const skip = (page - 1) * limit

    const articles = await db.article.findMany({
      where: {
        published: true,
        ...(categoryId && { categoryId }),
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    const total = await db.article.count({
      where: {
        published: true,
        ...(categoryId && { categoryId }),
      },
    })

    return NextResponse.json({
      articles,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
