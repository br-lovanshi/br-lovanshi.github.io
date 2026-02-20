import HireForm from "@/components/HireForm";
import { client } from "@/lib/sanity.client";
import { authorQuery } from "@/lib/queries";
import { Briefcase, Clock, MessageSquare, Zap } from "lucide-react";

export const revalidate = 60;

export const metadata = {
    title: "Hire Me | Brajesh Lovanshi",
    description: "Open to full-time roles, freelance projects, and technical consultations. Send me a message and let's talk.",
};

const DEFAULT_LOOKING_FOR = [
    "Backend / Systems Engineering roles",
    "Cloud & distributed systems projects",
    "Open-source consulting",
    "Technical architecture reviews",
    "Full Stack Developer"
];

const DEFAULT_WORK_TYPES = [
    { label: "💼 Full-time / Contract Role", value: "Full-time Job" },
    { label: "🚀 Freelance Project", value: "Freelance" },
    { label: "🧠 Technical Consultation", value: "Consultation" },
    { label: "✉️ Other / Just saying hi", value: "Other" },
];

const highlights = [
    { icon: Zap, title: "Fast Response", desc: "I reply within 1–2 business days." },
    { icon: Briefcase, title: "Open to Work", desc: "Available for full-time, freelance & consulting." },
    { icon: MessageSquare, title: "Direct Line", desc: "Your message lands straight in my inbox." },
    { icon: Clock, title: "IST (UTC+5:30)", desc: "Based in India — comfortable with async work." },
];

export default async function HirePage() {
    const author = await client.fetch(authorQuery);

    const lookingFor: string[] = author?.lookingFor?.length
        ? author.lookingFor
        : DEFAULT_LOOKING_FOR;

    const workTypes: { label: string; value: string }[] = author?.workTypes?.length
        ? author.workTypes
        : DEFAULT_WORK_TYPES;

    return (
        <div className="py-8 md:py-12 space-y-12">
            {/* Header */}
            <div className="pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
                <span
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full mb-5"
                    style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}
                >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--indigo)" }} />
                    Available for new opportunities
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Let's Work Together</h1>
                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                    Whether it's a full-time role, a freelance project, or a quick consultation — I'd love to hear about your opportunity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Left: Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-4">
                        {highlights.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-3.5 group">
                                <div
                                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                                    style={{ background: "var(--indigo-muted)" }}
                                >
                                    <Icon size={16} style={{ color: "var(--indigo)" }} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-primary">{title}</p>
                                    <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* What I'm looking for — from Sanity */}
                    <div className="card p-5">
                        <div className="relative z-10 space-y-3">
                            <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--indigo)" }}>
                                What I'm Looking For
                            </h3>
                            <ul className="space-y-2">
                                {lookingFor.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--indigo)" }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="md:col-span-3">
                    <div className="card p-7">
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-primary mb-1">Send me a message</h2>
                            <p className="text-sm text-muted-foreground mb-6">
                                All fields are required. I read every message personally.
                            </p>
                            {/* workTypes passed as prop from server — editable in Sanity */}
                            <HireForm workTypes={workTypes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
