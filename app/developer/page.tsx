import Container from "@/components/Container";
import { client } from "@/lib/sanity.client";
import { resourcesQuery } from "@/lib/queries";
import { FileText, Wrench, Download, ExternalLink } from "lucide-react";

export const revalidate = 60;

export default async function DeveloperPage() {
    const resources = await client.fetch(resourcesQuery);

    return (
        <div className="py-20">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-6 flex items-center gap-3">
                        <span className="text-teal font-mono text-xl">06.</span> Developer Resources
                    </h1>
                    <p className="text-slate text-lg max-w-2xl">
                        A curated list of tools, cheat sheets, and architectural decision records
                        that I find useful. Feel free to use them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.length > 0 ? (
                        resources.map((resource: any, index: number) => (
                            <div key={index} className="bg-light-navy p-6 rounded-lg border border-transparent hover:border-teal/30 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-navy rounded text-teal">
                                        {resource.type === 'pdf' && <FileText size={24} />}
                                        {resource.type === 'tool' && <Wrench size={24} />}
                                        {resource.type === 'interview' && <FileText size={24} />}
                                        {(!resource.type || resource.type === 'architecture') && <FileText size={24} />}
                                    </div>
                                    {resource.fileURL ? (
                                        <a href={resource.fileURL} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-teal">
                                            <Download size={20} />
                                        </a>
                                    ) : resource.url ? (
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-teal">
                                            <ExternalLink size={20} />
                                        </a>
                                    ) : null}
                                </div>
                                <h3 className="text-xl font-bold text-lightest-slate mb-2">{resource.title}</h3>
                                <p className="text-slate text-sm mb-4">{resource.description}</p>

                                <div className="mt-auto">
                                    <span className="text-xs font-mono text-teal bg-teal/10 px-2 py-1 rounded capitalize">
                                        {resource.type || 'Resource'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate italic">No resources found.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}
