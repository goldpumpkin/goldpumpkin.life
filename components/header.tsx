"use client";


import {NextPage} from "next";
import {usePathname} from "next/navigation";
import {HeaderNavLinks} from "@/data/meta-data";
import Link from "next/link";

const Header: NextPage = () => {
    const pathname = usePathname();

    return (
        <header className="flex max-w-3xl container mx-auto px-6 py-4">
            <nav className="flex w-full">
                <ul className="flex flex-1 ml-[-0.5rem] justify-center space-x-4 md:justify-start md:space-x-0">
                    {HeaderNavLinks?.map((nav : any) => (
                        <li key={nav?.title} className="p-2">
                            <Link className={`flex ${
                                pathname === nav?.href
                                    ? "underline"
                                    : "dark:text-slate-500 outline-none hover:underline dark:hover:text-slate-200 "
                            }`} href={nav?.href}>
                                {nav?.title}
                            </Link>
                        </li>

                    ))}
                </ul>
            </nav>
        </header>

    );
}

export default Header;