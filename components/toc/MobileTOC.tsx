"use client";

import { useState } from "react";
import { TOCItem } from "@/lib/toc";
import { LuList, LuX } from "react-icons/lu";

interface MobileTOCProps {
    items: TOCItem[];
}

export default function MobileTOC({ items }: MobileTOCProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    if (items.length === 0) return null;

    return (
        <>
            {/* 浮动按钮 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-20 right-6 z-40 xl:hidden
                          p-3 rounded-full shadow-lg
                          bg-slate-200 dark:bg-slate-600
                          text-slate-700 dark:text-slate-200
                          hover:bg-slate-300 dark:hover:bg-slate-500
                          transition-colors"
                aria-label="Toggle Table of Contents"
            >
                {isOpen ? <LuX className="w-5 h-5" /> : <LuList className="w-5 h-5" />}
            </button>

            {/* 抽屉 */}
            {isOpen && (
                <>
                    {/* 遮罩 */}
                    <div
                        className="fixed inset-0 z-40 bg-black/20 xl:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* 内容 */}
                    <div className="fixed bottom-0 left-0 right-0 z-50 xl:hidden
                                   max-h-[60vh] overflow-y-auto
                                   bg-white dark:bg-my-blue
                                   rounded-t-2xl shadow-2xl p-6">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                            目录
                        </h4>
                        <ul className="space-y-3">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className={item.level === 3 ? "ml-4" : ""}
                                >
                                    <button
                                        onClick={() => handleClick(item.id)}
                                        className="text-left w-full py-2 text-slate-600 dark:text-slate-300
                                                  hover:text-blue-600 dark:hover:text-blue-400
                                                  transition-colors"
                                    >
                                        {item.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
}
