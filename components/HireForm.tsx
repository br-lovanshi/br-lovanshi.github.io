"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const WORK_TYPES = [
    { value: "", label: "Select type of work…" },
    { value: "Full-time Job", label: "💼 Full-time / Contract Role" },
    { value: "Freelance", label: "🚀 Freelance Project" },
    { value: "Consultation", label: "🧠 Technical Consultation" },
    { value: "Other", label: "✉️ Other / Just saying hi" },
];

export default function HireForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [cooldown, setCooldown] = useState(0);
    const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startCooldown = () => {
        let secs = 60;
        setCooldown(secs);
        cooldownRef.current = setInterval(() => {
            secs -= 1;
            setCooldown(secs);
            if (secs <= 0) {
                clearInterval(cooldownRef.current!);
                setCooldown(0);
            }
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === "loading" || cooldown > 0) return;

        const form = e.currentTarget;
        const data = new FormData(form);

        // Honeypot check (client-side redundancy)
        if (data.get("botcheck")) return;

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
                    name: data.get("name"),
                    email: data.get("email"),
                    work_type: data.get("work_type"),
                    message: data.get("message"),
                    botcheck: data.get("botcheck"),
                    subject: `Hire Me: ${data.get("work_type")} — ${data.get("name")}`,
                    from_name: "Portfolio Contact Form",
                }),
            });

            const json = await res.json();

            if (json.success) {
                setStatus("success");
                form.reset();
                startCooldown();
            } else {
                throw new Error(json.message || "Submission failed");
            }
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || "Something went wrong. Please try again.");
        }
    };

    const inputClass = `
        w-full px-4 py-3 rounded-xl text-sm bg-transparent border text-foreground
        placeholder:text-muted-foreground/60
        focus:outline-none focus:ring-2 transition-all duration-200
    `;
    const inputStyle = {
        borderColor: "var(--border)",
        // @ts-ignore
        "--tw-ring-color": "var(--indigo)",
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Honeypot — invisible to humans, attracts bots */}
            <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="name">
                        Your Name <span style={{ color: "var(--indigo)" }}>*</span>
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Brajesh Lovanshi"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="email">
                        Email Address <span style={{ color: "var(--indigo)" }}>*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className={inputClass}
                        style={inputStyle}
                    />
                </div>
            </div>

            {/* Work type */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="work_type">
                    Type of Work <span style={{ color: "var(--indigo)" }}>*</span>
                </label>
                <select
                    id="work_type"
                    name="work_type"
                    required
                    className={inputClass}
                    style={{ ...inputStyle, appearance: "auto" }}
                    defaultValue=""
                >
                    {WORK_TYPES.map((t) => (
                        <option key={t.value} value={t.value} disabled={t.value === ""}>
                            {t.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="message">
                    Message <span style={{ color: "var(--indigo)" }}>*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the role, project, or opportunity. Include timeline, tech stack, and budget if relevant."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                />
            </div>

            {/* Success banner */}
            {status === "success" && (
                <div className="flex items-start gap-3 p-4 rounded-xl text-sm" style={{ background: "var(--indigo-muted)", border: "1px solid var(--indigo)", color: "var(--indigo)" }}>
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Message sent!</p>
                        <p className="opacity-80 mt-0.5">I'll get back to you within 1-2 business days.</p>
                    </div>
                </div>
            )}

            {/* Error banner */}
            {status === "error" && (
                <div className="flex items-start gap-3 p-4 rounded-xl text-sm bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{errorMsg}</p>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "loading" || cooldown > 0}
                className="btn-primary w-full justify-center text-base py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
                {status === "loading" ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                ) : cooldown > 0 ? (
                    <>{`Wait ${cooldown}s before sending again`}</>
                ) : (
                    <><Send size={16} /> Send Message</>
                )}
            </button>

            <p className="text-xs text-center text-muted-foreground/60">
                Protected against spam · I'll reply within 1-2 business days
            </p>
        </form>
    );
}
