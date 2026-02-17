import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: [],
                },
            ],
        }),
        defineField({
            name: 'shortBio',
            title: 'Short Summary',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'competencies',
            title: 'Core Competencies',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'socials',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'resume',
            title: 'Resume PDF',
            type: 'file',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
})
