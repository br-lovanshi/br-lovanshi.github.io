import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { postsQuery } from "@/lib/queries";

// Revalidate every 60 seconds
// export const revalidate = 60;

export const metadata = {
    title: "Blog | Brajesh Lovanshi",
    description: "Technical articles on software engineering, distributed systems, and more.",
};

export default async function BlogPage() {
    const posts = await client.fetch(postsQuery);

    return (
        <div className="space-y-8">
            <div className="border-b border-border pb-8">
                <h1 className="text-3xl font-bold text-primary mb-4">Blog</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Thoughts on software architecture, distributed systems, and engineering leadership.
                </p>
            </div>

            <div className="space-y-8">
                {posts.length > 0 ? (
                    posts.map((post: any) => (
                        <article key={post.slug} className="group flex flex-col items-start gap-2">
                            <Link href={`/blog/${post.slug}`} className="block w-full">
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                                    <h2 className="text-xl font-bold text-primary group-hover:underline underline-offset-4 decoration-primary/30 transition-colors">
                                        {post.title}
                                    </h2>
                                    <time className="text-sm font-mono text-muted-foreground shrink-0">
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            </Link>
                        </article>
                    ))
                ) : (
                    <p className="text-muted-foreground italic">No posts found yet.</p>
                )}
            </div>
        </div>
    );
}
