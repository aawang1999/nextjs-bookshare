import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: reviewId } = await params;
    const { content } = await request.json();

    if (!content) {
        return NextResponse.json({ error: "Content required" }, { status: 400 });
    }

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
    });

    if (!review) {
        return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            userId: session.user.id,
            reviewId,
        },
    });

    return NextResponse.json(comment, { status: 201 });
}