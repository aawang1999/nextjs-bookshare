import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";

export const dynamic = "force-dynamic";

export default async function ReviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await auth();

    const review = await prisma.review.findUnique({
        where: { id },
        include: {
            user: true,
            comments: {
                orderBy: { createdAt: "asc" },
                include: { user: true },
            },
        },
    });

    if (!review) {
        notFound();
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{review.title}</h1>
                <p className="text-gray-500">by {review.author}</p>
                <div className="mt-1 text-sm text-gray-700">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                </div>
            </div>

            <p className="whitespace-pre-wrap mb-6">{review.content}</p>

            <div className="text-xs text-gray-400 mb-8">
                Reviewed by {review.user.name ?? "Anonymous"} on{" "}
                {new Date(review.createdAt).toLocaleDateString()}
            </div>

            <hr className="mb-6" />

            <h2 className="text-lg font-semibold mb-4">
                Comments ({review.comments.length})
            </h2>

            <CommentList comments={review.comments} />

            {session ? (
                <div className="mt-4">
                    <CommentForm reviewId={review.id} />
                </div>
            ) : (
                <p className="mt-4 text-sm text-gray-400">
                    Sign in to leave a comment.
                </p>
            )}
        </div>
    );
}