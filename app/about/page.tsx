import { Metadata } from "next";
import Link from "next/link";
import { FaReact, FaRust } from "react-icons/fa";
import { IoLogoJavascript, IoLogoVercel } from "react-icons/io5";
import {SiVim, SiRedis, SiMysql, SiDocker} from "react-icons/si";

import { AboutPage } from "@/data/meta-data";
import {FaJava} from "react-icons/fa6";

export const metadata: Metadata = AboutPage.metadata;

const techStackIcons = [
  {
    title: "Java",
    href: "https://www.java.com/",
    icon: <FaJava className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    icon: <IoLogoJavascript className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "Rust",
    href: "https://www.rust-lang.org/",
    icon: <FaRust className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "React",
    href: "https://react.dev/",
    icon: <FaReact className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "Docker",
    href: "https://www.docker.com/",
    icon: <SiDocker className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "Vercel",
    href: "https://vercel.com/",
    icon: <IoLogoVercel className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "MySQL",
    href: "https://www.mysql.com/",
    icon: <SiMysql className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "Redis",
    href: "https://redis.io/",
    icon: <SiRedis className="w-6 h-6" />,
    target: "_blank",
  },
  {
    title: "Vim",
    href: "https://www.vim.org/",
    icon: <SiVim className="w-6 h-6" />,
    target: "_blank",
  },
];

export default function About() {
  return (
    <div className="flex flex-col relative max-w-none prose dark:prose-invert">
      <h1>About</h1>
      <div>
        <div>
          <p>
            Hi, I’m Gold 👋, a web development software engineer, keen to try new things, currently like trading, blockchain and running 🏃🏻.
          </p>
        </div>
        <hr />
        <h2>Tech Stack</h2>
        <ul className="flex items-center space-x-2 pl-0 flex-wrap">
          {techStackIcons.map((tech) => (
            <Link
              title={tech.title}
              key={tech.title}
              className="text-inherit hover:text-black mb-2 dark:text-slate-200 dark:hover:text-white"
              href={tech.href}
              target={"_blank"}
            >
              {tech.icon}
            </Link>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
}
