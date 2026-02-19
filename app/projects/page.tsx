import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { projectsQuery } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
    title: "Projects | Brajesh Lovanshi",
    description: "A collection of systems, applications, and architectural challenges.",
};

export default async function ProjectsPage() {
    const projects = await client.fetch(projectsQuery);

    return (
        <div className="space-y-8">
            <div className="border-b border-border pb-8">
                <h1 className="text-3xl font-bold text-primary mb-4">Projects</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Selected works showcasing distributed systems, backend architecture, and cloud infrastructure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.length > 0 ? (
                    projects.map((project: any) => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className="group block p-6 rounded-lg border border-border hover:border-primary/50 transition-all hover:bg-muted/30"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-primary group-hover:underline underline-offset-4 decoration-primary/30">
                                    {project.title}
                                </h2>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>

                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                {project.tagline}
                            </p>

                            {project.techStack && (
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech: string) => (
                                        <span key={tech} className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))
                ) : (
                    <p className="text-muted-foreground italic">No projects found.</p>
                )}
            </div>
        </div>
    );
}
