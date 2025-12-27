export interface TOCItem {
    id: string;
    text: string;
    level: 2 | 3;
}

/**
 * 从 Markdown 内容中提取 h2, h3 标题
 * ID 生成规则与 rehypeSlug 一致
 */
export function extractTOC(content: string): TOCItem[] {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length as 2 | 3;
        const text = match[2].trim();
        const id = slugify(text);

        items.push({ id, text, level });
    }

    return items;
}

/**
 * 生成 slug，与 rehypeSlug 默认行为一致
 * - 转小写
 * - 空格转连字符
 * - 移除特殊字符（保留中文）
 */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fa5-]/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
}
