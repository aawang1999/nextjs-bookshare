"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b border-gray-200 bg-white px-6 py-3">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-lg font-semibold">
                        Book Reviews
                    </Link>
                    {session && (
                        <Link href="/reviews/new" className="text-sm text-gray-600 hover:text-gray-900">
                            Write A Review
                        </Link>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {session ? (
                        <>
                            {session.user?.name && (
                                <img src={session.user.image} alt="" className="h-7 w-7 rounded-full" />
                            )}
                            <span className="text-sm text-gray-700">
                                {session.user?.name}
                            </span>
                            <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-gray-700">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <button onClick={() => signIn("github")} className="text-sm text-gray-600 hover:text-gray-900">
                            Sign In With GitHub
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}