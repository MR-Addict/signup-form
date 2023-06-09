import Link from "next/link";

import style from "./page.module.css";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("首页");

export default async function Page() {
  return (
    <main className='background w-full flex-1 frame flex flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-5'>
        <h1 className='flex flex-col items-center md:flex-row text-4xl'>
          <span>远景实验室</span>
          <span className={style.title}>活动报名</span>
        </h1>
        <p className='text-center text-lg'>
          点击下方报名按钮，参与我们的<strong>创意乐高</strong>活动吧。
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-5 md:gap-7'>
        <Link href='/lego' className={style.button}>
          报名创意乐高
        </Link>
      </div>
    </main>
  );
}
