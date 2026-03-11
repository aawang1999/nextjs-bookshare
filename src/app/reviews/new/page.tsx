import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";

export default async function NewReviewPage() {
    const session = await auth();
    if (!session) redirect("/api/auth/signin");

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Write A Review</h1>
            <ReviewForm />
        </div>
    );
}