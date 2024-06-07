# Gold Blog

Gold'Blog.

## Features

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Content**: [MDX](https://mdxjs.com/) + [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Analytics**: [Umami](https://umami.is/)
- **Comment**: [Giscus](https://giscus.app)
- **Deployment**: [Cloudflare](https://www.cloudflare.com/)

## Overview

- `app/blog/*` - Static pre-rendered posts using `next-mdx-remote`.
- `components/*` - The components defined as functions provide more features for all pages.
- `content/posts` - All the MDX files for blog posts.
- `data/*` - All private information (matadata, headers, articles, etc.) about the pages.
- `lib/*` - A collection of helpful utilities or functions for external services.
- `public/*` - Static public assets including fonts and images.

## License

This repository is licensed under [MIT](https://github.com/goldpumpkin/goldpumpkin.life/blob/master/LICENSE), and the content of all pages is licensed under [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/).
