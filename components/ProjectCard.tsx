import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

interface ProjectProps {
    title: string;
    slug: string;
    tagline: string;
    mainImage: string;
    techStack: string[];
    githubLink?: string;
    liveLink?: string;
    featured?: boolean;
}

export default function ProjectCard({ project }: { project: ProjectProps }) {
    return (
        <div className="group relative bg-light-navy rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 shadow-xl">
            <div className="relative h-48 md:h-64 w-full overflow-hidden">
                {project.mainImage && (
                    <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                <div className="absolute inset-0 bg-navy/50 group-hover:bg-navy/0 transition-colors duration-300" />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-lightest-slate mb-2 group-hover:text-teal transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                        {project.title}
                    </Link>
                </h3>
                <p className="text-slate mb-4 line-clamp-2">
                    {project.tagline}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack?.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-teal">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-light-slate">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">
                            <Github size={20} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
