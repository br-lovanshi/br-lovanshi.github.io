import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity.client";
import { featuredProjectsQuery, postsQuery } from "@/lib/queries";

// Revalidate every 60 seconds
export const revalidate = 60;

async function getRecentPosts() {
  // Fetch all posts and slice top 3, or modify query to limit.
  // Using existing query for now and slicing in JS for simplicity, or we can add a new query.
  // Better to use groq limit if efficient, but this is fine for small blog.
  const posts = await client.fetch(postsQuery);
  return posts.slice(0, 5);
}

export default async function Home() {
  const [projects, posts] = await Promise.all([
    client.fetch(featuredProjectsQuery),
    getRecentPosts(),
  ]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-mono tracking-tight text-primary">
          Brajesh Lovanshi
        </h1>
        <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Senior Software Engineer & Systems Architect.
          </p>
          <p>
            I build reliable, scalable distributed systems.
            Passionate about backend architecture, cloud infrastructure, and simplifying complexity.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/about" className="text-primary hover:underline underline-offset-4 decoration-primary/30">
              Read more →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts - Hugo Narrow Style: Date | Title */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
            Recent Posts
          </h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4">
            View all
          </Link>
        </div>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <div key={post.slug} className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <time className="text-sm font-mono text-muted-foreground shrink-0 w-32">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <Link href={`/blog/${post.slug}`} className="text-lg font-medium text-primary hover:underline underline-offset-4 decoration-primary/30 group-hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground italic">No posts found.</p>
          )}
        </div>
      </section>

      {/* Selected Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold font-mono text-primary">
            Selected Projects
          </h2>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block group p-4 -mx-4 rounded-md hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-primary group-hover:underline underline-offset-4 decoration-primary/30">
                    {project.title}
                  </h3>
                  {/* Link Icon or arrow? */}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.tagline}
                </p>
                {project.techStack && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="text-xs font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground italic">No projects found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
