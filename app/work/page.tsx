import { client } from "@/lib/sanity.client";
import { jobsQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import { Calendar, Briefcase } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
    title: "Work | Brajesh Lovanshi",
    description: "My professional work history and experience.",
};

export default async function WorkPage() {
    const jobs = await client.fetch(jobsQuery);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <Briefcase size={24} style={{ color: "var(--indigo)" }} />
                    <h1 className="text-3xl font-bold text-primary">Work</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A timeline of the companies I&apos;ve worked at and the roles I&apos;ve held.
                </p>
            </div>

            {/* Timeline */}
            <div className="relative ml-3 md:ml-5 space-y-8" style={{ borderLeft: "2px solid var(--border)" }}>
                {jobs.length > 0 ? (
                    jobs.map((job: any, index: number) => (
                        <div key={index} className="relative pl-8 md:pl-12 group">
                            {/* Timeline dot */}
                            <div
                                className="absolute -left-[7px] top-3 w-3.5 h-3.5 rounded-full transition-transform group-hover:scale-125"
                                style={{ background: "var(--indigo)", boxShadow: "0 0 0 3px var(--background), 0 0 0 5px var(--indigo)", outline: "none" }}
                            />

                            <div className="card p-6">
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row gap-3 md:items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-primary">{job.role}</h3>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                {job.logo && (
                                                    <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white ring-1 ring-border">
                                                        <Image src={job.logo} alt={job.company} fill className="object-contain" />
                                                    </div>
                                                )}
                                                <span className="text-sm font-semibold" style={{ color: "var(--indigo)" }}>{job.company}</span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground whitespace-nowrap px-2.5 py-1 rounded-lg self-start"
                                            style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
                                        >
                                            <Calendar size={11} />
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
                                        <ul className="space-y-2 mb-4">
                                            {job.impact.map((item: string, i: number) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="shrink-0 mt-0.5 text-sm" style={{ color: "var(--indigo)" }}>▹</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {job.technologies && job.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.technologies.map((tech: string) => (
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
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="pl-8 text-muted-foreground italic">No work experience found. Add jobs in Sanity Studio.</p>
                )}
            </div>
        </div>
    );
}
