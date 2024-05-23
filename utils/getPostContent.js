import fs from "fs";
import matter from "gray-matter";


export default function getPostContent(slug) {
    const folder = 'recipes/'
    const file = folder + `${slug}.md`
    const decodeFile = decodeURIComponent(file);
    const content = fs.readFileSync(decodeFile, 'utf8')

    const matterResult = matter(content)
    return matterResult
}