import Container from "@/components/Container";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="py-20 flex-grow flex items-center">
            <Container>
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-slate text-lg mb-12 leading-relaxed">
                        I am always open to discussing new projects, creative ideas, or opportunities
                        to be part of your visions. If you have a specific system you need architected
                        or just want to scale your current infrastructure, let&apos;s talk.
                    </p>

                    <a
                        href="mailto:contact@br-lovanshi.com"
                        className="inline-flex items-center gap-3 px-8 py-5 border border-teal text-teal rounded-md font-mono text-lg hover:bg-teal/10 transition-colors mb-16"
                    >
                        <Mail /> contact@br-lovanshi.com
                    </a>

                    <div className="flex justify-center gap-8">
                        <a
                            href="https://github.com/br-lovanshi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="p-4 rounded-full bg-light-navy text-slate group-hover:text-teal transition-colors">
                                <Github size={24} />
                            </div>
                            <span className="text-sm font-mono text-slate group-hover:text-teal">GitHub</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/br-lovanshi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="p-4 rounded-full bg-light-navy text-slate group-hover:text-teal transition-colors">
                                <Linkedin size={24} />
                            </div>
                            <span className="text-sm font-mono text-slate group-hover:text-teal">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
}
