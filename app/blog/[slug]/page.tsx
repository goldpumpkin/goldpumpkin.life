import React from 'react'
import getPostMetadata from "@/lib/getPostMetadata";
import getPostContent from "@/lib/getPostContent";
import CustomMDX from "@/components/CustomMDX";

export const dynamicParams = false;

export const generateStaticParams = async () => {
    const posts = getPostMetadata('content/posts')
    return posts.map((post) => ({ slug: post.slug}))
}

export async function generateMetadata( params: any, searchParams: any) {
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `The Bubbly Baker ${id.replaceAll('_', ' ')}`
    }
}

export default function Blog(props: any) {

    const slug = props.params.slug;
    const decodeSlug = decodeURI(slug);
    const post = getPostContent(decodeSlug)
    const title = post.data.title;
    return (
            <article className = "flex flex-col items-start justify-center w-full">
                <h1 className="font-extrabold text-2xl tracking-tight mb-0">
                    {title}
                </h1>
                <div className = "w-full prose dark:prose-invert max-w-none mb-30">
                    <CustomMDX content={post.content} />
                </div>
            </article>
    )
}