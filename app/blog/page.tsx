import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { postsQuery } from "@/lib/queries";
import { ArrowUpRight, BookOpen } from "lucide-react";

export const metadata = {
    title: "Blog | Brajesh Lovanshi",
    description: "Technical articles on software engineering, distributed systems, and more.",
};

export default async function BlogPage() {
    const posts = await client.fetch(postsQuery);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <BookOpen size={24} style={{ color: "var(--indigo)" }} />
                    <h1 className="text-3xl font-bold text-primary">Blog</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Thoughts on software architecture, distributed systems, and engineering leadership.
                </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posts.length > 0 ? (
                    posts.map((post: any) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="card group block p-6"
                        >
                            <div className="relative z-10">
                                {/* Category + Date */}
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    {post.categories?.slice(0, 2).map((cat: string) => (
                                        <span
                                            key={cat}
                                            className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                                            style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                    <time className="text-xs font-mono text-muted-foreground ml-auto">
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>

                                {/* Title */}
                                <h2
                                    className="text-lg font-bold text-primary mb-2 line-clamp-2 transition-colors"
                                    style={{ transitionProperty: "color" }}
                                >
                                    <span className="group-hover:underline underline-offset-4" style={{ textDecorationColor: "var(--indigo)" }}>
                                        {post.title}
                                    </span>
                                </h2>

                                {/* Author */}
                                {post.author && (
                                    <p className="text-xs text-muted-foreground">by {post.author}</p>
                                )}
                            </div>

                            <ArrowUpRight
                                size={16}
                                className="absolute bottom-5 right-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                style={{ color: undefined, position: "absolute" }}
                            />
                        </Link>
                    ))
                ) : (
                    <p className="text-muted-foreground italic col-span-2">No posts found yet.</p>
                )}
            </div>
        </div>
    );
}
