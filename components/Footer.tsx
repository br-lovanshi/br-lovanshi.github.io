import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-auto" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <span className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Brajesh Lovanshi
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="/brajesh_lovanshi_resume.pdf"
                        download
                        className="btn-secondary text-xs px-3 py-1.5"
                    >
                        Resume
                    </a>
                    <a
                        href="https://github.com/br-lovanshi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                        aria-label="GitHub"
                    >
                        <Github size={16} />
                    </a>
                    <a
                        href="https://linkedin.com/in/brajesh-lovanshi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={16} />
                    </a>
                    <a
                        href="mailto:learning.brajeshlovanshi@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
                        aria-label="Email"
                    >
                        <Mail size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
