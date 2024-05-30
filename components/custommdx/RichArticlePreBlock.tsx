import SyntaxHighlighter, {PrismLight} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { solarizedLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import React from "react";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";


PrismLight.registerLanguage("tsx", tsx);
PrismLight.registerLanguage("java", java);

type RichArticleCodeBlockProps = {
    children: string;
    className: string;
};

const customCodeBlockStyle = {
    lineHeight: '1.5',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
    padding: '20px'
};

export const RichArticleCodeBlock = ({ children, className }: RichArticleCodeBlockProps) => {
    const language = className?.replace("lang-", "");

    return (
        <SyntaxHighlighter language={language} style={solarizedLight}>
            {children}
        </SyntaxHighlighter>
    );
};

type RichArticlePreBlockProps = {
    children: React.JSX.Element | React.JSX.Element[];
};

export const RichArticlePreBlock = ({ children, ...rest }: RichArticlePreBlockProps) => {
    if ("type" in children && children["type"] === "code") {
        return RichArticleCodeBlock({ children: children["props"]["children"], className: children["props"]["className"] });
    }
    return <pre {...rest}>{children}</pre>;
};