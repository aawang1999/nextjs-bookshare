import Link from "next/link";

interface ReviewCardProps {
    id: string;
    title: string;
    author: string;
    rating: number;
    createdAt: Date;
    userName: string | null;
    commentCount: number;
}

export default function ReviewCard({
    id,
    title,
    author,
    rating,
    createdAt,
    userName,
    commentCount,
}: ReviewCardProps) {
    return (
        <Link href={`/reviews/${id}`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <p className="text-sm text-gray-500">by {author}</p>
                </div>
                <span className="text-sm font-medium text-gray-700">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                </span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <span>Reviewed by {userName ?? "Anonymous"}</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
                <span>
                    {commentCount} {commentCount === 1 ? "comment" : "comments"}
                </span>
            </div>
        </Link>
    );
}