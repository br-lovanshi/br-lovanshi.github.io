import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { jobsQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import { Calendar, Briefcase, ArrowLeft } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

export default async function WorkPage() {
    const jobs = await client.fetch(jobsQuery);

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary mb-12">Work History</h1>

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
                                <div className="flex items-center gap-2 text-muted-foreground font-mono text-xs whitespace-nowrap bg-secondary px-2 py-1 rounded">
                                    <Calendar size={12} />
                                    {new Date(job.startDate).getFullYear()} - {job.endDate ? new Date(job.endDate).getFullYear() : "Present"}
                                </div>
                            </div>

                            <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none text-muted-foreground mb-4">
                                <PortableText
                                    value={job.description}
                                    components={{
                                        block: {
                                            normal: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                                        },
                                        list: {
                                            bullet: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {job.technologies?.map((tech: string) => (
                                    <span key={tech} className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded">
                                        {tech}
                                    </span>
                                ))}
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
