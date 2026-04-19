import { client } from "@/lib/sanity.client";
import { skillsQuery } from "@/lib/queries";
import { Code, BadgeCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
    title: "Skills | Brajesh Lovanshi",
    description: "My technical skills and competencies.",
};

export default async function SkillsPage() {
    const categories = await client.fetch(skillsQuery);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                    <Code size={24} style={{ color: "var(--indigo)" }} />
                    <h1 className="text-3xl font-bold text-primary">Skills</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A comprehensive overview of my technical skills, languages, and tools.
                </p>
            </div>

            {/* Skills Content */}
            <div className="space-y-10">
                {categories.length > 0 ? (
                    categories.map((category: any, index: number) => (
                        <section key={index} className="space-y-4">
                            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                                <BadgeCheck size={20} style={{ color: "var(--indigo)" }} />
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.skills?.map((skill: any, skillIdx: number) => (
                                    <div 
                                        key={skillIdx} 
                                        className="card p-4 flex items-center gap-3 transition-colors hover:border-indigo group"
                                        style={{ borderColor: "var(--border)" }}
                                    >
                                        {skill.logo ? (
                                            <div className="relative w-8 h-8 rounded shrink-0 overflow-hidden bg-white/5 p-1 group-hover:scale-110 transition-transform">
                                                <Image src={skill.logo} alt={skill.name} fill className="object-contain p-0.5" />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded shrink-0 bg-secondary flex items-center justify-center group-hover:bg-indigo/10 transition-colors">
                                                <Code size={16} className="text-muted-foreground group-hover:text-indigo transition-colors" />
                                            </div>
                                        )}
                                        <span className="font-medium text-sm text-primary group-hover:text-indigo transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <p className="text-muted-foreground italic">No skills found. Add skill categories in Sanity Studio.</p>
                )}
            </div>
        </div>
    );
}
