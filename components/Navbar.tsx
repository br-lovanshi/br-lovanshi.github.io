"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Hire Me", href: "/hire" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="glass sticky top-0 z-50" style={{ borderBottom: "1px solid var(--glass-border)" }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tight hover:text-indigo transition-colors" style={{ color: "var(--foreground)" }}>
                        Brajesh Lovanshi
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? "text-white font-semibold"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                        }`}
                                    style={isActive ? { background: "var(--indigo)" } : {}}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="flex items-center space-x-3 border-l pl-4 ml-2" style={{ borderColor: "var(--border)" }}>
                            <a href="https://github.com/br-lovanshi" target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-secondary">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://linkedin.com/in/brajesh-lovanshi" target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-secondary">
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile button */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass" style={{ borderTop: "1px solid var(--glass-border)" }}>
                    <div className="px-4 py-3 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? "text-white"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                        }`}
                                    style={isActive ? { background: "var(--indigo)" } : {}}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="flex items-center gap-4 px-4 py-3 mt-1" style={{ borderTop: "1px solid var(--border)" }}>
                            <a href="https://github.com/br-lovanshi" target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/in/brajesh-lovanshi" target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
