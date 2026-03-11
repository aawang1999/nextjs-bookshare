import { prisma } from "@/lib/prisma";
import ReviewCard from "@/components/ReviewCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      _count: { select: { comments: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recent Book Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              title={review.title}
              author={review.author}
              rating={review.rating}
              createdAt={review.createdAt}
              userName={review.user.name}
              commentCount={review._count.comments}
            />
          ))}
        </div>
      )}
    </div>
  );
}