import { groq } from 'next-sanity'

// Author / About
export const authorQuery = groq`
  *[_type == "author"][0] {
    name,
    "slug": slug.current,
    image,
    bio,
    shortBio,
    competencies,
    socials,
    "resumeURL": resume.asset->url
  }
`

// Work Experience
export const jobsQuery = groq`
  *[_type == "job"] | order(startDate desc) {
    company,
    "logo": logo.asset->url,
    role,
    startDate,
    endDate,
    description,
    technologies,
    impact
  }
`

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, _createdAt desc) {
    title,
    "slug": slug.current,
    tagline,
    "mainImage": mainImage.asset->url,
    techStack,
    featured
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) [0...3] {
    title,
    "slug": slug.current,
    tagline,
    "mainImage": mainImage.asset->url,
    techStack
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    tagline,
    "mainImage": mainImage.asset->url,
    problem,
    solution,
    architecture,
    impact,
    techStack,
    githubLink,
    liveLink
  }
`

// Blog
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    publishedAt,
    "categories": categories[]->title,
    "author": author->name
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "mainImage": mainImage.asset->url,
    publishedAt,
    "categories": categories[]->title,
    "author": author->name,
    body
  }
`

// Resources
export const resourcesQuery = groq`
  *[_type == "resource"] | order(title asc) {
    title,
    description,
    type,
    "fileURL": file.asset->url,
    url,
    "icon": icon.asset->url
  }
`
