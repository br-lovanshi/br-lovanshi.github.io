import Link from "next/link";
import Container from "./Container";

export default function Hero() {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-32">
            <Container>
                <div className="flex flex-col items-start max-w-4xl">
                    <h1 className="text-teal font-mono text-sm md:text-base mb-5">
                        Hi, my name is
                    </h1>
                    <h2 className="text-lightest-slate text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                        Brajesh Lovanshi.
                    </h2>
                    <h3 className="text-slate text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                        I build scalable, business-critical systems.
                    </h3>
                    <p className="text-slate max-w-xl text-base md:text-lg leading-relaxed mb-12">
                        I am a Systems Architect and Senior Software Engineer specializing in building
                        high-performance, reliable distributed systems. I help organizations
                        transform complex requirements into elegant, scalable technological solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/projects"
                            className="px-8 py-4 border border-teal text-teal rounded-md font-mono text-sm hover:bg-teal/10 transition-colors text-center"
                        >
                            Check out my work
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-teal text-navy rounded-md font-mono text-sm font-bold hover:bg-teal/90 transition-colors text-center"
                        >
                            Let&apos;s build something
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
