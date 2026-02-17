import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'job',
    title: 'Work Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'company',
            title: 'Company Name',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Company Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'role',
            title: 'Role / Title',
            type: 'string',
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave blank if currently working here',
        }),
        defineField({
            name: 'description',
            title: 'Description / Responsibilities',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'impact',
            title: 'Measurable Impact',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Key achievements and metrics',
        })
    ],
    orderings: [
        {
            title: 'Start Date, Newest First',
            name: 'startDateDesc',
            by: [
                { field: 'startDate', direction: 'desc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'company',
            subtitle: 'role',
            media: 'logo',
        },
    },
})
