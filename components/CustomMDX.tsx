import Link from "next/link";
import React from "react";
import Markdown from "markdown-to-jsx";
import {RichArticlePreBlock} from "@/components/custommdx/RichArticlePreBlock";

export const MarkdownLink = ({ href, children }: any) => {
    const isExternal = href.startsWith('http');

    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <Link href={href}>
            {children}
        </Link>
    );
};

// export const MarkdownImage = ({ src, alt }: any) => {
//     return (
//         <Image src={src} alt={alt} width={800} height={600}/>
//     );
// }


const options = {
    overrides: {
        a: MarkdownLink,
        pre: RichArticlePreBlock,
    },
};

const CustomMDX = ({content}: any) => {
    return (<Markdown children={content} options={options}  />);
}

export default CustomMDX;