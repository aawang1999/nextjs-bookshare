import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, author, content, rating } = await request.json();

    if (!title || !author || !content || !rating) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Rating must be a number between 1 and 5" }, { status: 400 });
    }

    const review = await prisma.review.create({
        data: {
            title,
            author,
            content,
            rating,
            userId: session.user.id,
        },
    });

    return NextResponse.json(review, { status: 201 });
}