interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    user: {
        name: string | null;
        image: string | null;
    };
}

export default function CommentList({ comments }: { comments: Comment[] }) {
    if (comments.length === 0) {
        return <p className="text-sm text-gray-400">No comments yet.</p>;
    }

    return (
        <div className="space-y-3">
            {comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-gray-200 pl-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        {comment.user.image && (
                            <img
                                src={comment.user.image}
                                alt=""
                                className="h-5 w-5 rounded-full"
                            />
                        )}
                        <span>{comment.user.name ?? "Anonymous"}</span>
                        <span>&middot;</span>
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                </div>
            ))}
        </div>
    );
}