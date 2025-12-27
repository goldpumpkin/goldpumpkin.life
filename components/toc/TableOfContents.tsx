"use client";

import { useEffect, useState } from "react";
import { TOCItem } from "@/lib/toc";

interface TableOfContentsProps {
    items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const headings = items
            .map(item => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[];

        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find(entry => entry.isIntersecting);
                if (visibleEntry) {
                    setActiveId(visibleEntry.target.id);
                }
            },
            {
                rootMargin: "-80px 0px -80% 0px",
                threshold: 0
            }
        );

        headings.forEach(heading => observer.observe(heading));

        return () => observer.disconnect();
    }, [items]);

    const handleClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    if (items.length === 0) return null;

    return (
        <nav className="toc-nav" aria-label="Table of Contents">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                目录
            </h4>
            <ul className="space-y-2 text-sm">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={item.level === 3 ? "ml-4" : ""}
                    >
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            className={`block py-1 border-l-2 pl-3 transition-colors duration-200
                                ${activeId === item.id
                                    ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
                                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
