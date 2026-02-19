import Link from "next/link";
import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/lib/sanity.client";
import { postBySlugQuery, postsQuery } from "@/lib/queries";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

// Generate static params for all posts
export async function generateStaticParams() {
    try {
        const posts = await client.fetch(postsQuery);
        if (!Array.isArray(posts)) return [];
        return posts
            .map((post: any) => {
                const slug =
                    typeof post.slug === "string"
                        ? post.slug
                        : post.slug?.current;
                return slug ? { slug } : null;
            })
            .filter(Boolean);
    } catch {
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

const components: PortableTextComponents = {
    types: {
        code: ({ value }: any) => (
            <div className="my-6 overflow-x-auto rounded-xl border" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
                {value.filename && (
                    <div className="px-4 py-2 text-xs font-mono border-b" style={{ color: "var(--indigo)", borderColor: "var(--border)" }}>
                        {value.filename}
                    </div>
                )}
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                    <code>{value.code}</code>
                </pre>
            </div>
        ),
        image: ({ value }: any) => (
            <div className="my-8 relative w-full h-80 rounded-xl flex items-center justify-center border" style={{ background: "var(--secondary)", borderColor: "var(--border)" }}>
                <p className="text-muted-foreground italic">{value.alt || "Blog Image"}</p>
            </div>
        ),
    },
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-4 text-primary">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3 text-primary">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="pl-5 italic my-6 text-muted-foreground" style={{ borderLeft: "3px solid var(--indigo)", background: "var(--indigo-muted)", borderRadius: "0 0.5rem 0.5rem 0", padding: "0.75rem 1.25rem" }}>
                {children}
            </blockquote>
        ),
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
            return (
                <a href={value.href} rel={rel} className="underline underline-offset-4 transition-opacity hover:opacity-80" style={{ color: "var(--indigo)", textDecorationColor: "var(--indigo)" }}>
                    {children}
                </a>
            );
        },
        code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded font-mono text-sm" style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}>
                {children}
            </code>
        ),
        strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const post = await client.fetch(postBySlugQuery, { slug });

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link href="/blog" className="btn-primary inline-flex">Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto py-8">
            {/* Back link */}
            <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group gap-1.5"
            >
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
                Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-12 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                        <Tag size={13} style={{ color: "var(--indigo)" }} />
                        {post.categories.map((cat: string) => (
                            <span
                                key={cat}
                                className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                                style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold mb-5 text-primary leading-tight">
                    {post.title}
                </h1>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono flex-wrap">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={13} style={{ color: "var(--indigo)" }} />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    {post.author && (
                        <>
                            <span className="text-muted-foreground/50">·</span>
                            <span>by {post.author}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Body */}
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-indigo font-sans text-base leading-relaxed">
                <PortableText value={post.body} components={components} />
            </div>

            {/* Footer nav */}
            <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
                <Link href="/blog" className="btn-secondary inline-flex">
                    <ArrowLeft size={15} /> All Posts
                </Link>
            </div>
        </article>
    );
}
