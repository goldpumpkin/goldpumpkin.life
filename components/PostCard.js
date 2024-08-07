import Link from "next/link";

export default function PostCard(props) {
    const { post } = props
    return (
        <Link className="unstyled" href={`/blog/${post.slug}`}>
            <div className="flex justify-between content-center p-4 mb-4 border hover:shadow-sm dark:hover:bg-my-deep-blue hover:bg-my-blue dark:border-slate-600 dark:bg-my-blue dark:hover:shadow-sm">
                <h3 className="font-bold">{post.title}</h3>
                <time className="text-sm text-slate-400 mt-2">
                    {post.publishedAt}
                </time>
            </div>
        </Link>
    )
}