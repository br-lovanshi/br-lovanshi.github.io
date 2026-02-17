import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { projectBySlugQuery, projectsQuery } from "@/lib/queries";
import { PortableText, PortableTextComponents } from "next-sanity";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

// Required for static export
export async function generateStaticParams() {
    try {
        const projects = await client.fetch(projectsQuery);
        // Ensure projects is an array before mapping
        if (!Array.isArray(projects)) {
            console.error("Sanity fetch returned non-array:", projects);
            return [];
        }
        return projects.map((project: any) => ({
            slug: project.slug,
        }));
    } catch (error) {
        console.error("Error generating static params for projects:", error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (!project) return {};

    return {
        title: `${project.title} | Brajesh Lovanshi`,
        description: project.tagline,
    };
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            return <div className="my-8 relative w-full h-80 bg-secondary rounded-lg flex items-center justify-center border border-border">
                <p className="text-muted-foreground italic">Image: {value.alt || 'Project Image'}</p>
            </div>
        },
        code: ({ value }: any) => {
            return (
                <div className="my-6 overflow-x-auto rounded-lg bg-secondary p-4 border border-border">
                    <pre className="text-sm font-mono">
                        <code>{value.code}</code>
                    </pre>
                </div>
            );
        },
    },
    block: {
        h3: ({ children }) => <h3 className="text-lg font-bold mt-6 mb-2 font-mono">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>,
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });

    if (!project) {
        notFound();
    }

    return (
        <div className="py-12">
            <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={16} /> Back to Projects
            </Link>

            <article className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-border pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-primary mb-4">{project.title}</h1>
                    <p className="text-xl text-muted-foreground font-mono mb-6">{project.tagline}</p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline underline-offset-4">
                                <Github size={20} /> <span className="font-mono text-sm">Source Code</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline underline-offset-4">
                                <ExternalLink size={20} /> <span className="font-mono text-sm">Live Demo</span>
                            </a>
                        )}
                    </div>

                    {project.mainImage && (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-secondary">
                            <Image src={project.mainImage} alt={project.title} fill className="object-cover" priority />
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {project.problem && (
                            <section>
                                <h2 className="text-2xl font-bold font-mono text-primary mb-4">The Problem</h2>
                                <p className="text-foreground/90 leading-relaxed">{project.problem}</p>
                            </section>
                        )}

                        {project.solution && (
                            <section>
                                <h2 className="text-2xl font-bold font-mono text-primary mb-4">The Solution</h2>
                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    <PortableText value={project.solution} components={components} />
                                </div>
                            </section>
                        )}

                        {project.architecture && (
                            <section>
                                <h2 className="text-2xl font-bold font-mono text-primary mb-4">Architecture</h2>
                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    <PortableText value={project.architecture} components={components} />
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-secondary/50 p-6 rounded-lg border border-border sticky top-24">
                            <h3 className="text-lg font-bold font-mono text-primary mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack?.map((tech: string) => (
                                    <span key={tech} className="text-xs font-mono text-muted-foreground border border-border bg-background px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {project.impact && (
                                <div>
                                    <h3 className="text-lg font-bold font-mono text-primary mb-4">Key Outcomes</h3>
                                    <ul className="space-y-3">
                                        {project.impact.map((item: string, i: number) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-primary mt-1">▹</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
