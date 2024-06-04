import {MDXRemote, MDXRemoteProps} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypePrism from "rehype-prism-plus";
import CustomLink from "@/components/custommdx/CustomLink";
import CustomImg from "@/components/custommdx/CustomImage";
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