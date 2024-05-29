import Markdown from "markdown-to-jsx"
import React from 'react'
import getPostMetadata from "@/lib/getPostMetadata";
import getPostContent from "@/lib/getPostContent";
import Link from "next/link";

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

const options = {
  overrides: {
    a: ({href, children}: any) => (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="bg-yellow-500">
        {children}
      </Link>
    ),
  },
};

export default function Blog(props: any) {

    const slug = props.params.slug
    const decodeSlug = decodeURI(slug);
    const post = getPostContent(decodeSlug)
    return (
        <main>
            <article>
                <Markdown children={post.content} options={options} />
            </article>
        </main>
    )
}