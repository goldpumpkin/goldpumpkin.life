import Markdown from "markdown-to-jsx"
import React from 'react'
import fs from 'fs'
import matter from "gray-matter"
import getPostMetadata from "../../../utils/getPostMetadata";

function getPostContent(slug) {
    const folder = 'recipes/'
    const file = folder + `${slug}.md`
    const decodeFile = decodeURIComponent(file);
    const content = fs.readFileSync(decodeFile, 'utf8')

    const matterResult = matter(content)
    return matterResult
}

export const generateStaticParams = async () => {
    const posts = getPostMetadata('recipes')
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params, searchParams }) {
    const id = params?.slug ? ' ⋅ ' + params?.slug : ''
    return {
        title: `The Bubbly Baker ${id.replaceAll('_', ' ')}`
    }
}

export default function RecipePage(props) {

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