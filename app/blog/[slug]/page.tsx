import Link from "next/link";
import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/lib/sanity.client";
import { postBySlugQuery, postsQuery } from "@/lib/queries";
import { ArrowLeft } from "lucide-react";

// Generate static params for all posts
export async function generateStaticParams() {
    try {
        const posts = await client.fetch(postsQuery);
        if (!Array.isArray(posts)) {
            console.error("Sanity fetch returned non-array:", posts);
            return [];
        }
        return posts
            .map((post: any) => {
                const slug =
                    typeof post.slug === "string"
                        ? post.slug
                        : post.slug?.current;
                return slug ? { slug } : null;
            })
            .filter(Boolean);
    } catch (error) {
        console.error("Error generating static params for blog:", error);
        return [];
    }
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const post = await client.fetch(postBySlugQuery, { slug });
    if (!post) return {};

    return {
        title: `${post.title} | Brajesh Lovanshi`,
        description: post.title,
    };
}

// Custom components for Portable Text
const components: PortableTextComponents = {
    types: {
        code: ({ value }: any) => {
            return (
                <div className="my-6 overflow-x-auto rounded-lg bg-secondary p-4 border border-border">
                    <pre className="text-sm font-mono">
                        <code>{value.code}</code>
                    </pre>
                    {value.filename && (
                        <div className="mt-2 text-xs text-muted-foreground w-full text-right">
                            {value.filename}
                        </div>
                    )}
                </div>
            );
        },
        image: ({ value }: any) => {
            return (
                <div className="my-8 relative w-full h-80 bg-secondary rounded-lg flex items-center justify-center border border-border">
                    <p className="text-muted-foreground italic">Image: {value.alt || 'Blog Image'}</p>
                </div>
            )
        }
    },
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-4">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const post = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
            </div>
        )
    }

    return (
        <article className="max-w-3xl mx-auto py-8">
            <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
            </Link>

            <header className="mb-12 border-b border-border pb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                    <time>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {post.categories && post.categories.length > 0 && (
                        <>
                            <span>•</span>
                            <span>{post.categories.join(", ")}</span>
                        </>
                    )}
                </div>
            </header>

            <div className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline font-sans">
                <PortableText value={post.body} components={components} />
            </div>
        </article>
    );
}
