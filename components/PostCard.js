import Link from "next/link";

export default function PostCard(props) {
    const { post } = props
    return (
        <Link className="unstyled" href={`/recipe/${post.slug}`}>
            <div className="flex justify-between content-center p-4 mb-4 border hover:shadow-sm dark:hover:bg-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-black dark:hover:shadow-sm">
                <h3>{post.title}</h3>
                <time className="text-sm text-slate-400 mt-2">
                    {post.publishedAt}
                </time>
            </div>
        </Link>
    )


}