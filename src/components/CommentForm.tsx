"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommentForm({ reviewId }: { reviewId: string }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const form = new FormData(e.currentTarget);
        const res = await fetch(`/api/reviews/${reviewId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: form.get("content") }),
        });

        if (res.ok) {
            e.currentTarget.reset();
            router.refresh();
        } else {
            alert("Failed to post comment");
        }
        setSubmitting(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                name="content"
                required
                placeholder="Write a comment..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button
                type="submit"
                disabled={submitting}
                className="bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50"
            >
                {submitting ? "..." : "Post"}
            </button>
        </form>
    );
}