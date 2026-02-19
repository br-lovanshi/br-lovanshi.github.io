"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                        Brajesh Lovanshi
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary font-bold" : "text-muted-foreground"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="flex items-center space-x-4 border-l border-border pl-6 ml-2">
                            {/* Socials - Minimal */}
                            <a href="https://github.com/br-lovanshi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://linkedin.com/in/brajesh-lovanshi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted-foreground hover:text-primary"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-b border-border bg-background">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="flex items-center gap-4 px-3 py-4 mt-2 border-t border-border">
                            <a href="https://github.com/br-lovanshi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com/in/brajesh-lovanshi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
