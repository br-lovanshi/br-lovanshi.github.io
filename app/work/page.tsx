import { client } from "@/lib/sanity.client";
import { jobsQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import { Calendar } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
    title: "Work | Brajesh Lovanshi",
    description: "My professional work history and experience.",
};

export default async function WorkPage() {
    const jobs = await client.fetch(jobsQuery);

    return (
        <div className="space-y-8">
            <div className="border-b border-border pb-8">
                <h1 className="text-3xl font-bold text-primary mb-4">Work</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A timeline of the companies I&apos;ve worked at and the roles I&apos;ve held.
                </p>
            </div>

            <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
                {jobs.length > 0 ? (
                    jobs.map((job: any, index: number) => (
                        <div key={index} className="relative pl-8 md:pl-12">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />

                            <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                                    <div className="text-primary font-mono text-sm flex items-center gap-2 mt-1">
                                        {job.logo && (
                                            <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white">
                                                <Image src={job.logo} alt={job.company} fill className="object-contain" />
                                            </div>
                                        )}
                                        {job.company}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs whitespace-nowrap bg-secondary px-2 py-1 rounded self-start">
                                    <Calendar size={12} />
                                    {new Date(job.startDate).getFullYear()} – {job.endDate ? new Date(job.endDate).getFullYear() : "Present"}
                                </div>
                            </div>

                            {job.description && (
                                <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none text-muted-foreground mb-4">
                                    <PortableText
                                        value={job.description}
                                        components={{
                                            block: {
                                                normal: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                                            },
                                            list: {
                                                bullet: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                                            },
                                        }}
                                    />
                                </div>
                            )}

                            {job.impact && job.impact.length > 0 && (
                                <ul className="space-y-1.5 mb-4">
                                    {job.impact.map((item: string, i: number) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-0.5 shrink-0">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {job.technologies && job.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {job.technologies.map((tech: string) => (
                                        <span key={tech} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded bg-secondary/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="pl-8 text-muted-foreground italic">
                        No work experience found. Add jobs in Sanity Studio.
                    </p>
                )}
            </div>
        </div>
    );
}
