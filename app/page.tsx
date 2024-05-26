import getPostMetadata from "@/lib/getPostMetadata";
import PostCard from "@/components/PostCard";

export default function Home() {

  const postMetadata = getPostMetadata('content/posts/')

  return (
      <main>
          <div className="postsContainer">
              {postMetadata.map((post, postIndex) => {
                  return (
                      <PostCard key={postIndex} post={post} />
                  )
              })}
          </div>
      </main>
  );
}
