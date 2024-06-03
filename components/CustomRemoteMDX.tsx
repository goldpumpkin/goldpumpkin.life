import {MDXRemote, MDXRemoteProps} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypePrism from "rehype-prism-plus";
import {serialize} from "next-mdx-remote/serialize";
import CustomLink from "@/components/custommdx/CustomLink";
import CustomImg from "@/components/custommdx/CustomImage";
import {RichArticlePreBlock} from "@/components/custommdx/RichArticlePreBlock";
import CustomPre from "@/components/custommdx/CustomPre";


const MDXComponent : any = {
    a: CustomLink,
    pre: CustomPre,
    img: CustomImg,
};

export default function CustomRemoteMDX(
    props: React.JSX.IntrinsicAttributes & MDXRemoteProps
) {
    return (
        <MDXRemote
            {...props}
            // components= {MDXComponent}
            components={{ ...MDXComponent, ...(props.components || {}) }}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                        rehypeSlug,
                        [
                            //@ts-ignore
                            rehypePrettyCode,
                            {
                                theme: "solarized-light",
                            },
                        ],
                        rehypeCodeTitles,
                        [
                            //@ts-ignore
                            rehypePrism,
                            {
                                showLineNumbers: true,
                            },
                        ],
                        [
                            rehypeAutolinkHeadings,
                            {
                                properties: {
                                    className: ["anchor"],
                                },
                            },
                        ],
                    ],
                },
            }}
        />
    );
}

export async function mdxToHtml(content: string) {
    const mdxSource = await serialize(content, {
        mdxOptions: {
            development: process.env.NODE_ENV === 'development',
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeSlug,
                rehypeCodeTitles,
                rehypeHighlight,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: {
                            className: ['anchor']
                        }
                    }
                ]
            ],
            format: 'mdx'
        }
    });

    return {
        html: mdxSource,
        wordCount: content.split(/\s+/gu).length,
    };
}
