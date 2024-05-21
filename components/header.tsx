"use client";


import {NextPage} from "next";
import {usePathname} from "next/navigation";
import {HeaderNavLinks} from "@/data/meta-data";
import Link from "next/link";

const Header: NextPage = () => {
    const pathname = usePathname();

    return (
        <header>
            <nav>
                <ul>
                    {HeaderNavLinks?.map((nav : any) => (
                        <li key={nav?.title}>
                            <Link href={nav?.href}>
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