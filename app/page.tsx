import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { client } from "@/lib/sanity.client";
import { projectsQuery, postsQuery } from "@/lib/queries";

export const revalidate = 60;

async function getRecentPosts() {
  const posts = await client.fetch(postsQuery);
  return posts.slice(0, 4);
}

export default async function Home() {
  const [allProjects, posts] = await Promise.all([
    client.fetch(projectsQuery),
    getRecentPosts(),
  ]);
  const projects = allProjects.slice(0, 4);

  return (
    <div className="space-y-20">

      {/* ── Hero ───────────────────────────────────── */}
      <section className="py-10 md:py-16 relative">
        {/* decorative glow */}
        <div
          className="absolute -top-16 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "var(--indigo)", opacity: 0.07 }}
        />
        <div className="relative">
          <p className="text-sm font-semibold font-mono mb-4 flex items-center gap-2" style={{ color: "var(--indigo)" }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--indigo)", boxShadow: "0 0 6px var(--indigo)" }} />
            Available for new opportunities
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-primary leading-tight">
            Brajesh Lovanshi
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mb-3 leading-relaxed">
            Senior Software Engineer & Systems Architect.
          </p>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            I build reliable, scalable distributed systems. Passionate about backend architecture, cloud infrastructure, and simplifying complexity.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" className="btn-primary">
              About Me <ArrowRight size={16} />
            </Link>
            <a href="/brajesh_lovanshi_resume.pdf" download className="btn-secondary">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── Recent Posts ──────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2.5">
            <BookOpen size={22} style={{ color: "var(--indigo)" }} />
            Recent Posts
          </h2>
          <Link href="/blog" className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: "var(--indigo)" }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card group block p-5 relative"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    {post.categories?.slice(0, 1).map((cat: string) => (
                      <span key={cat} className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--indigo-muted)", color: "var(--indigo)" }}>
                        {cat}
                      </span>
                    ))}
                    <time className="text-xs font-mono text-muted-foreground ml-auto">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                  </div>
                  <h3 className="text-base font-bold text-primary group-hover:text-indigo transition-colors mb-1 line-clamp-2" style={{ "--tw-text-opacity": "1" } as any}>
                    {post.title}
                  </h3>
                </div>
                <ArrowUpRight size={16} className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-indigo transition-colors" style={{ color: undefined }} />
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground italic col-span-2">No posts found.</p>
          )}
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2.5">
            <Layers size={22} style={{ color: "var(--indigo)" }} />
            Selected Projects
          </h2>
          <Link href="/projects" className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: "var(--indigo)" }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card group block p-5"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-primary group-hover:text-indigo transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.tagline}</p>
                  {project.techStack && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="text-xs font-mono text-muted-foreground px-1.5 py-0.5 rounded" style={{ background: "var(--secondary)" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground italic col-span-2">No projects found.</p>
          )}
        </div>
      </section>

    </div>
  );
}
