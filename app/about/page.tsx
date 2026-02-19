import Image from "next/image";
import { client } from "@/lib/sanity.client";
import { authorQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import { Download, Github, Linkedin, Mail, User } from "lucide-react";
import { urlForImage } from "@/lib/image";

export const revalidate = 60;

export const metadata = {
    title: "About | Brajesh Lovanshi",
    description: "Senior Software Engineer & Systems Architect.",
};

export default async function AboutPage() {
    const author = await client.fetch(authorQuery);

    if (!author) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold">Author not found</h1>
            </div>
        );
    }

    return (
        <div className="py-8 md:py-12 space-y-12">
            {/* Header */}
            <div className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <User size={24} style={{ color: "var(--indigo)" }} />
                    <h1 className="text-3xl font-bold text-primary">About</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Senior Software Engineer & Systems Architect based in India.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* ── Sidebar ── */}
                <div className="w-full md:w-1/3 flex flex-col gap-5 md:sticky top-24">
                    {/* Avatar */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border bg-secondary" style={{ borderColor: "var(--border)" }}>
                        {author.image ? (
                            <Image
                                src={urlForImage(author.image).url()}
                                alt={author.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                No Image
                            </div>
                        )}
                        {/* Indigo overlay shimmer on hover */}
                        <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity rounded-2xl" style={{ background: "var(--indigo)" }} />
                    </div>

                    {/* Info card */}
                    <div className="card p-5 space-y-4">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-primary">{author.name}</h2>
                            <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--indigo)" }}>
                                Systems Architect
                            </p>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-3 relative z-10">
                            {author.socials?.map((social: any) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                    aria-label={social.platform}
                                >
                                    {social.platform === "GitHub" && <Github size={18} />}
                                    {social.platform === "LinkedIn" && <Linkedin size={18} />}
                                    {social.platform === "Email" && <Mail size={18} />}
                                </a>
                            ))}
                        </div>

                        {author.resumeURL && (
                            <a
                                href={author.resumeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                download="Brajesh_Lovanshi_Resume.pdf"
                                className="btn-primary w-full justify-center relative z-10"
                            >
                                <Download size={15} /> Download Resume
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Main content ── */}
                <div className="w-full md:w-2/3 space-y-10">
                    {/* Bio */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-5 pb-3" style={{ borderBottom: "2px solid var(--indigo)", borderBottomWidth: "2px", display: "inline-block" }}>
                            About Me
                        </h2>
                        <div className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-primary mt-4">
                            <PortableText
                                value={author.bio}
                                components={{
                                    block: {
                                        normal: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
                                        h2: ({ children }) => <h2 className="text-xl font-bold mt-8 mb-4">{children}</h2>,
                                    },
                                    list: {
                                        bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                                    },
                                }}
                            />
                        </div>
                    </section>

                    {/* Core Competencies */}
                    {author.competencies && (
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-5 pb-3" style={{ borderBottom: "2px solid var(--indigo)", borderBottomWidth: "2px", display: "inline-block" }}>
                                Core Competencies
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-4">
                                {author.competencies?.map((skill: string) => (
                                    <li
                                        key={skill}
                                        className="flex items-center gap-2.5 text-sm text-muted-foreground group"
                                    >
                                        <span className="shrink-0 w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-150" style={{ background: "var(--indigo)", boxShadow: "0 0 4px var(--indigo)" }} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
