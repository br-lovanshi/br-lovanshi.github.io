import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border py-6 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <span className="text-muted-foreground text-sm block">
                        &copy; {new Date().getFullYear()} Brajesh Lovanshi.
                    </span>
                    <span className="text-muted-foreground text-xs block mt-1">
                        Powered by Next.js & Sanity.
                    </span>
                </div>

                <div className="flex space-x-6">
                    <a
                        href="https://github.com/br-lovanshi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="https://linkedin.com/in/brajesh-lovanshi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="mailto:contact@br-lovanshi.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Email"
                    >
                        <Mail size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
