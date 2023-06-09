"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import navbarData from "../../config";
import style from "./Hamburger.module.css";

export default function MobileNavbar() {
  const { data: session } = useSession();
  const [isExpand, setIsExpand] = useState(false);
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className='md:hidden flex flex-row items-center'>
      <button
        type='button'
        aria-expanded={isExpand}
        className={style.hamburger}
        onClick={() => setIsExpand(!isExpand)}
        aria-label='mobile nav button to toggle menu'
      >
        <svg fill='currentcolor' viewBox='0 0 100 100' width={25}>
          <rect width='80' height='5' x='10' y='25'></rect>
          <rect width='80' height='5' x='10' y='45'></rect>
          <rect width='80' height='5' x='10' y='65'></rect>
        </svg>
      </button>
      <div
        style={{ transform: `translateX(${isExpand ? "0" : "-100%"})` }}
        className='z-10 w-full flex flex-col items-start gap-4 py-5 px-5 md:px-48 absolute left-0 top-16 rounded-b-lg bg-white shadow-md duration-500'
      >
        <ul className='w-full flex flex-col gap-1'>
          {navbarData
            .filter((item) => item.public || session)
            .map((item, index) => (
              <li key={index}>
                {item.local ? (
                  <Link
                    href={item.link}
                    onClick={() => setIsExpand(false)}
                    className={`w-full font-semibold flex flex-row gap-2 items-center justify-start border-b-2 p-2 rounded-md ${
                      rootPath === item.link ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    target='_blank'
                    className='w-full font-semibold flex flex-row gap-2 items-center justify-start border-b-2 p-2 rounded-md text-gray-700 hover:text-blue-600'
                  >
                    {item.title}
                  </a>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
