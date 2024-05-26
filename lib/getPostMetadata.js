import fs from 'fs'
import matter from 'gray-matter'

export default function getPostMetadata(basePath) {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    // get the file data
    const posts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8')
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            publishedAt: matterResult.data.date,
            slug: filename.replace('.md', '')
        }
    }).sort((f1, f2) => {
        return f1.publishedAt > f2.publishedAt ? -1 : 1;
    })
    return posts
}