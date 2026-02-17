import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline / One-liner',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'problem',
            title: 'Business Problem',
            type: 'text',
        }),
        defineField({
            name: 'solution',
            title: 'Technical Solution',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'architecture',
            title: 'Architecture Overview',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'impact',
            title: 'Measurable Impact',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'githubLink',
            title: 'GitHub URL',
            type: 'url',
        }),
        defineField({
            name: 'liveLink',
            title: 'Live URL',
            type: 'url',
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'tagline',
            media: 'mainImage',
        },
    },
})
