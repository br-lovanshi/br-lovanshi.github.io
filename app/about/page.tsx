import Image from "next/image";
import { client } from "@/lib/sanity.client";
import { authorQuery } from "@/lib/queries";
import { PortableText } from "next-sanity";
import { Download, Github, Linkedin, Mail } from "lucide-react";
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
        <div className="py-8 md:py-12">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Sidebar: Image & Quick Info */}
                <div className="w-full md:w-1/3 flex flex-col gap-6 sticky top-24">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border bg-secondary">
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
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-primary">{author.name}</h1>
                            <p className="text-muted-foreground text-sm">Systems Architect</p>
                        </div>

                        <div className="flex gap-4">
                            {author.socials?.map((social: any) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    aria-label={social.platform}
                                >
                                    {social.platform === "GitHub" && <Github size={20} />}
                                    {social.platform === "LinkedIn" && <Linkedin size={20} />}
                                    {/* Add generic if needed */}
                                </a>
                            ))}
                        </div>

                        <a
                            href="/brajesh_lovanshi_resume.pdf"
                            download="Brajesh_Lovanshi_Resume.pdf"
                            className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-md font-mono text-sm hover:bg-primary/5 transition-colors"
                        >
                            <Download size={16} /> Resume
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full md:w-2/3">
                    <section className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-primary">
                        <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-2">About Me</h2>
                        <PortableText
                            value={author.bio}
                            components={{
                                block: {
                                    normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>,
                                    h2: ({ children }) => <h2 className="text-xl font-bold mt-8 mb-4">{children}</h2>,
                                },
                                list: {
                                    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                                }
                            }}
                        />
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-2">
                            Core Competencies
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            {author.competencies?.map((skill: string) => (
                                <li key={skill} className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                                    <span className="text-primary">▹</span> {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
