import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { projectsQuery } from "@/lib/queries";
import { ArrowUpRight, Layers } from "lucide-react";

export const revalidate = 60;

export const metadata = {
    title: "Projects | Brajesh Lovanshi",
    description: "A collection of systems, applications, and architectural challenges.",
};

export default async function ProjectsPage() {
    const projects = await client.fetch(projectsQuery);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <Layers size={24} style={{ color: "var(--indigo)" }} />
                    <h1 className="text-3xl font-bold text-primary">Projects</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Selected works showcasing distributed systems, backend architecture, and cloud infrastructure.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.length > 0 ? (
                    projects.map((project: any) => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className="card group block p-6"
                        >
                            <div className="relative z-10">
                                {/* Featured badge */}
                                {project.featured && (
                                    <span
                                        className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full mb-3 inline-block"
                                        style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}
                                    >
                                        Featured
                                    </span>
                                )}

                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-lg font-bold text-primary group-hover:underline underline-offset-4 pr-4" style={{ textDecorationColor: "var(--indigo)" }}>
                                        {project.title}
                                    </h2>
                                    <ArrowUpRight
                                        className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        style={{ color: "var(--indigo)", opacity: 0.5 }}
                                    />
                                </div>

                                <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                                    {project.tagline}
                                </p>

                                {project.techStack && (
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {project.techStack.slice(0, 5).map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded"
                                                style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-muted-foreground italic col-span-2">No projects found.</p>
                )}
            </div>
        </div>
    );
}
