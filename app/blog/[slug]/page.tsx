import React from 'react'
import getPostMetadata from "@/lib/getPostMetadata";
import getPostContent from "@/lib/getPostContent";
import CustomRemoteMDX from "@/components/CustomRemoteMDX";

export const dynamicParams = false;

export const generateStaticParams = async () => {
    const posts = getPostMetadata('content/posts')
    return posts.map((post) => ({ slug: post.slug}))
}

export default async function Blog(props: any) {
    const slug = props.params.slug;
    const decodeSlug = decodeURI(slug);
    const {data, content} = getPostContent(decodeSlug);
    const title = data.title;
    return (
            <article className = "flex flex-col items-start justify-center w-full">
                <h1 className="font-extrabold text-2xl tracking-tight mb-0">
                    {title}
                </h1>
                <div className = "w-full prose dark:prose-invert max-w-none mb-8">
                    <CustomRemoteMDX source={content} />
                </div>
            </article>
    )
}