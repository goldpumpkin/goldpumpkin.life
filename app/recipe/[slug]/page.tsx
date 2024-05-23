import Markdown from "markdown-to-jsx"
import React from 'react'
import getPostMetadata from "../../../utils/getPostMetadata";
import getPostContent from "../../../utils/getPostContent";

export const generateStaticParams = async () => {
    const posts = getPostMetadata('recipes')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata( params: any, searchParams: any) {
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `The Bubbly Baker ${id.replaceAll('_', ' ')}`
    }
}

export default function RecipePage(props: any) {

    const slug = props.params.slug
    const post = getPostContent(slug)
    return (
        <main>
            <article>
                <Markdown>{post.content}</Markdown>
            </article>
        </main>
    )
}