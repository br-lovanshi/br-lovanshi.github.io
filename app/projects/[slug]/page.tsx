import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { projectBySlugQuery, projectsQuery } from "@/lib/queries";
import { PortableText, PortableTextComponents } from "next-sanity";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

// Generate static params for all projects
export async function generateStaticParams() {
    try {
        const projects = await client.fetch(projectsQuery);
        return projects
            .map((project: any) => {
                const slug =
                    typeof project.slug === "string"
                        ? project.slug
                        : project.slug?.current;
                return slug ? { slug } : null;
            })
            .filter(Boolean);
    } catch (error) {
        console.error("Error generating static params for projects:", error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} | Brajesh Lovanshi`,
        description: project.tagline,
    };
}

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-primary">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="pl-4 italic my-4 text-muted-foreground" style={{ borderLeft: "3px solid var(--indigo)" }}>
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-1">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-1">{children}</ol>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="hover:underline underline-offset-4" style={{ color: "var(--indigo)" }}>
                    {children}
                </a>
            );
        },
        code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded font-mono text-sm" style={{ background: "var(--secondary)", color: "var(--indigo)" }}>
                {children}
            </code>
        ),
    },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (!project) notFound();

    return (
        <article className="max-w-4xl mx-auto py-10">
            {/* Back link */}
            <Link
                href="/projects"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group gap-1.5"
            >
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
                Back to Projects
            </Link>

            {/* Header */}
            <header className="mb-12">
                {project.featured && (
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full mb-4 inline-block" style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}>
                        Featured Project
                    </span>
                )}
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">{project.tagline}</p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            <Github size={16} /> View on GitHub
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <ExternalLink size={16} /> Live Demo
                        </a>
                    )}
                </div>

                {/* Hero image */}
                {project.mainImage && (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                        <Image
                            src={project.mainImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </header>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Main sections */}
                <div className="md:col-span-2 space-y-10">
                    {project.problem && (
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-primary pb-2" style={{ borderBottom: "2px solid var(--indigo)", display: "inline-block" }}>
                                The Problem
                            </h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none mt-4">
                                {Array.isArray(project.problem)
                                    ? <PortableText value={project.problem} components={components} />
                                    : <p className="leading-relaxed text-muted-foreground">{project.problem}</p>}
                            </div>
                        </section>
                    )}

                    {project.solution && (
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-primary pb-2" style={{ borderBottom: "2px solid var(--indigo)", display: "inline-block" }}>
                                The Solution
                            </h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none mt-4">
                                {Array.isArray(project.solution)
                                    ? <PortableText value={project.solution} components={components} />
                                    : <p className="leading-relaxed text-muted-foreground">{project.solution}</p>}
                            </div>
                        </section>
                    )}

                    {project.architecture && (
                        <section>
                            <h2 className="text-xl font-bold mb-4 text-primary pb-2" style={{ borderBottom: "2px solid var(--indigo)", display: "inline-block" }}>
                                Architecture & Key Features
                            </h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none mt-4 prose-a:text-indigo">
                                <PortableText value={project.architecture} components={components} />
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-5">
                    {project.techStack && (
                        <div className="card p-5">
                            <div className="relative z-10">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4" style={{ color: "var(--indigo)" }}>
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="text-xs font-mono px-2 py-1 rounded"
                                            style={{ background: "var(--indigo-muted)", color: "var(--indigo)", border: "1px solid rgba(199,15,141,0.25)" }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {project.impact && (
                        <div className="card p-5">
                            <div className="relative z-10">
                                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--indigo)" }}>
                                    Key Impact
                                </h3>
                                <ul className="space-y-3">
                                    {project.impact.map((item: string, i: number) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2.5">
                                            <span className="shrink-0 mt-0.5" style={{ color: "var(--indigo)" }}>▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </article>
    );
}
