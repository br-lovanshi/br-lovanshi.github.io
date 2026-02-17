import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'resource',
    title: 'Developer Resource',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'type',
            title: 'Resource Type',
            type: 'string',
            options: {
                list: [
                    { title: 'PDF Guide', value: 'pdf' },
                    { title: 'Tool/Utility', value: 'tool' },
                    { title: 'Interview Prep', value: 'interview' },
                    { title: 'Architecture Note', value: 'architecture' },
                ]
            }
        }),
        defineField({
            name: 'file',
            title: 'File Download',
            type: 'file',
        }),
        defineField({
            name: 'url',
            title: 'External URL',
            type: 'url',
        }),
        defineField({
            name: 'icon',
            title: 'Icon/Image',
            type: 'image',
        })
    ],
})
