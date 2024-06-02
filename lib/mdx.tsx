import path from 'node:path'
import { serialize } from 'next-mdx-remote/serialize';
import fs from "fs";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// --- Define the post path ---

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'content/posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((filePath) => /\.md?$/.test(filePath))

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((filePath) => filePath.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

// export const postMdxData = (hasContent = true, count = 999) : Post[] => {
//   const posts = postFilePaths.map((filePath) => {
//     const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
//     const { content, data } = matter(source);
//
//     return {
//       content: hasContent ? content : '',
//       data,
//       publicAtMs: +new Date(data.publicAt ?? 0),
//       readingTime: readingTime(content).minutes,
//       filePath,
//       fileName: filePath.replace(/\.md?$/, ""),
//     };
//   })
//   .sort((a, b) => {
//     return b.publicAtMs - a.publicAtMs
//   })
//
//   return posts.slice(0, count);
// }

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
      format: 'md'
    }
  });

  return {
    html: mdxSource,
    wordCount: content.split(/\s+/gu).length,
  };
}