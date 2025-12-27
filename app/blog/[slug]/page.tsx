import React from 'react'
import getPostMetadata from "@/lib/getPostMetadata";
import getPostContent from "@/lib/getPostContent";
import CustomRemoteMDX from "@/components/CustomRemoteMDX";
import Comment from "@/components/Comment";
import TableOfContents from "@/components/toc/TableOfContents";
import MobileTOC from "@/components/toc/MobileTOC";
import { extractTOC } from "@/lib/toc";

export const dynamicParams = false;

export const generateStaticParams = async () => {
    const posts = getPostMetadata('content/posts')
    return posts.map((post) => ({ slug: post.slug }))
}

export default async function Blog(props: any) {
    const slug = props.params.slug;
    const decodeSlug = decodeURI(slug);
    const { data, content } = getPostContent(decodeSlug);
    const title = data.title;

    const tocItems = extractTOC(content);

    return (
        <div className="relative">
            {/* 主文章区域 */}
            <article className="flex flex-col items-start justify-center w-full">
                <h1 className="font-extrabold text-2xl tracking-tight mb-4 text-slate-900 dark:text-slate-100">
                    {title}
                </h1>
                <div className="w-full prose dark:prose-invert max-w-none mb-8">
                    <CustomRemoteMDX source={content} />
                </div>
                <Comment />
            </article>

            {/* 桌面端 TOC - 固定在右侧 */}
            <aside className="hidden xl:block fixed top-24 right-[max(2rem,calc((100vw-768px)/2-280px))]
                             w-64 max-h-[calc(100vh-120px)] overflow-y-auto
                             p-4 rounded-lg bg-slate-50/80 dark:bg-my-blue/50 backdrop-blur-sm">
                <TableOfContents items={tocItems} />
            </aside>

            {/* 移动端 TOC */}
            <MobileTOC items={tocItems} />
        </div>
    )
}
