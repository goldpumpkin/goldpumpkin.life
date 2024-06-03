import React from 'react'
import getPostMetadata from "@/lib/getPostMetadata";
import getPostContent from "@/lib/getPostContent";
import CustomMDX from "@/components/CustomMDX";
import {mdxToHtml, POSTS_PATH} from "@/lib/mdx";
import {MDXRemote} from 'next-mdx-remote/rsc'
import CustomRemoteMDX from "@/components/CustomRemoteMDX";

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

export default async function Blog(props: any) {
    const slug = props.params.slug;
    const decodeSlug = decodeURI(slug);
    const {data, content} = getPostContent(decodeSlug);
    // const html = await mdxToHtml(content);
    // const {compiledSource}: any = html;
    // console.log(compiledSource);
    const title = data.title;
    return (
            <article className = "flex flex-col items-start justify-center w-full">
                <h1 className="font-extrabold text-2xl tracking-tight mb-0">
                    {title}
                </h1>
                <div className = "w-full prose dark:prose-invert max-w-none mb-8">
                    {/*<CustomMDX content={data.content} />*/}
                    <CustomRemoteMDX source={content} />
                </div>
            </article>
    )
}