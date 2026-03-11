"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReviewForm() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        
        const form = new FormData(e.currentTarget);
        const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: form.get("title"),
                author: form.get("author"),
                content: form.get("content"),
                rating: Number(form.get("rating")),
            }),
        });

        if (res.ok) {
            const review = await res.json();
            router.push(`/reviews/${review.id}`);
        } else {
            setSubmitting(false);
            alert("Failed to create review");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Book Title
                </label>
                <input
                    id="title"
                    name="title"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">
                    Book Author
                </label>
                <input
                    id="author"
                    name="author"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Your Review
                </label>
                <textarea
                    id="content"
                    name="content"
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
            </div>
            <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">
                    Rating (1-5)
                </label>
                <select
                    id="rating"
                    name="rating"
                    required
                    defaultValue="5"
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                            {n} — {"★".repeat(n)}
                            {"☆".repeat(5 - n)}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                disabled={submitting}
                className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50"
            >
                {submitting ? "Posting..." : "Post Review"}
            </button>
        </form>
    );
}