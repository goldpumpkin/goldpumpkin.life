import { MetadataRoute } from "next";
import getPostMetadata from "@/lib/getPostMetadata";

export default function sitemap(): MetadataRoute.Sitemap {

  const posts = getPostMetadata('content/posts')
  const blogs = posts.map((post) => ({
        url: `https://goldpumpkin.life/blog/${post.slug}`,
        lastModified: post.publishedAt,
      }
  ))

  const routes = ["", "/blog", "/about"].map((route) => ({
    url: `https://goldpumpkin.life${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));
  return [...routes, ...blogs];
}
