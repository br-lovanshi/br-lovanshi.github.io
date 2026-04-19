import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'skillCategory',
    title: 'Skill Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Category Title',
            type: 'string', // e.g., Languages, Frameworks, Cloud
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
        }),
        defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Skill Name' },
                        { 
                            name: 'logo', 
                            type: 'image', 
                            title: 'Logo (Optional)',
                            options: { hotspot: true }
                        },
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            media: 'logo'
                        }
                    }
                }
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'order',
        },
    },
})
