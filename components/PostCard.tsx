import Link from "next/link";

interface Post {
    title: string;
    publishedAt: string;
    slug: string;
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link className="unstyled group block" href={`/blog/${post.slug}`}>
            <article className="p-5 mb-4 rounded-lg border border-slate-200
                               dark:border-slate-600 dark:bg-my-blue
                               transition-all duration-200 ease-in-out
                               hover:border-slate-300 hover:shadow-md hover:bg-slate-50
                               dark:hover:bg-my-deep-blue dark:hover:border-slate-500">
                <time className="text-sm text-slate-400 dark:text-slate-500 block mb-2">
                    {post.publishedAt}
                </time>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100
                              group-hover:text-blue-600 dark:group-hover:text-blue-400
                              transition-colors duration-200">
                    {post.title}
                </h3>
            </article>
        </Link>
    )
}
