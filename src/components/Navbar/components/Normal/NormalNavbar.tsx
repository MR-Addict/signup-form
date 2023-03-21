"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import navbarData from "../../config";
import style from "./NormalNavbar.module.css";

export default function NormalNavbar() {
  const { data: session } = useSession();
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <ul className='hidden md:flex flex-row gap-6'>
      {navbarData
        .filter((item) => item.public || session)
        .map((item, index) => (
          <li key={index}>
            <Link href={item.link} className={[rootPath === item.link ? style.active : "", style.link].join(" ")}>
              {item.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
