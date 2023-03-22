import Link from "next/link";

import style from "./page.module.css";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("乐高");

export default async function Page() {
  return (
    <main className='w-full frame flex flex-col items-center justify-center'>
      <div className='flex flex-col md:flex-row gap-5 md:gap-7'>
        <Link href='/lego/signup' className={style.button}>
          参与报名
        </Link>
        <Link href='/lego/infomation' className={style.button}>
          查看信息
        </Link>
      </div>
    </main>
  );
}
