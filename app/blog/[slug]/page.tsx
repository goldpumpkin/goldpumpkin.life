import Markdown from "markdown-to-jsx"
import React from 'react'
import getPostMetadata from "@/lib/getPostMetadata";
import getPostContent from "@/lib/getPostContent";
import Link from "next/link";
import CustomMDX from "@/components/CustomMDX";

export const dynamicParams = false;

export const generateStaticParams = async () => {
    const posts = getPostMetadata('content/posts')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata( params: any, searchParams: any) {
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `The Bubbly Baker ${id.replaceAll('_', ' ')}`
    }
}

export default function Blog(props: any) {

    const slug = props.params.slug
    const decodeSlug = decodeURI(slug);
    const post = getPostContent(decodeSlug)
    return (
        <main>
            <article>
                <CustomMDX content={post.content} />
            </article>
        </main>
    )
}