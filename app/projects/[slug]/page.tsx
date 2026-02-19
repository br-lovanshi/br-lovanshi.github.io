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
                // Sanity can return slug as a string ("slug": slug.current)
                // or as an object ({ _type: "slug", current: "..." }) — handle both
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

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Brajesh Lovanshi`,
        description: project.tagline,
    };
}

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary font-mono">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary font-mono">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-primary font-mono">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-1">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-1">{children}</ol>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-primary hover:underline underline-offset-4 decoration-primary/30">
                    {children}
                </a>
            );
        },
        code: ({ children }) => <code className="bg-secondary text-primary px-1.5 py-0.5 rounded font-mono text-sm">{children}</code>,
    },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) {
        notFound();
    }

    return (
        <article className="max-w-4xl mx-auto py-12 px-6">
            <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Projects
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono text-primary">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">{project.tagline}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
                        >
                            <Github size={18} />
                            View on GitHub
                        </a>
                    )}
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                            <ExternalLink size={18} />
                            Live Demo
                        </a>
                    )}
                </div>

                {project.mainImage && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">
                    {project.problem && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-mono text-primary">The Problem</h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground">
                                {Array.isArray(project.problem)
                                    ? <PortableText value={project.problem} components={components} />
                                    : <p className="leading-relaxed">{project.problem}</p>}
                            </div>
                        </section>
                    )}

                    {project.solution && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-mono text-primary">The Solution</h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground">
                                {Array.isArray(project.solution)
                                    ? <PortableText value={project.solution} components={components} />
                                    : <p className="leading-relaxed">{project.solution}</p>}
                            </div>
                        </section>
                    )}

                    {project.architecture && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-mono text-primary">Architecture & Key Features</h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-mono prose-a:text-primary">
                                <PortableText value={project.architecture} components={components} />
                            </div>
                        </section>
                    )}
                </div>

                <aside className="space-y-8">
                    {project.techStack && (
                        <div className="bg-muted/30 p-6 rounded-lg border border-border">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 font-mono">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech: string) => (
                                    <span key={tech} className="text-xs font-mono text-primary bg-background border border-border px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.impact && (
                        <div className="bg-muted/30 p-6 rounded-lg border border-border">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 font-mono">Key Impact</h3>
                            <ul className="space-y-3">
                                {project.impact.map((item: string, i: number) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                        <span className="text-primary mt-1">▹</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </article>
    );
}
