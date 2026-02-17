'use client'

import { ImageLoaderProps } from 'next/image'

export default function sanityLoader({ src, width, quality }: ImageLoaderProps) {
    if (src.includes('cdn.sanity.io')) {
        const prj = 'cp3xoza3'
        const dataset = 'production'
        const url = new URL(src)
        // Check if it's already a full URL or needs construction. 
        // Actually usually src from sanity is already absolute.
        // But we want to append params.
        return `${src}?w=${width}&q=${quality || 75}&auto=format`
    }
    return src
}
