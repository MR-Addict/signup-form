import Link from "next/link";
import Image from "next/image";

import style from "./page.module.css";

import { setMetadata } from "@/lib/utils";
import background from "@/data/assets/footballbg.png";

export const metadata = setMetadata("足球仿真");

export default function Page() {
  return (
    <main className='background w-full flex-1 frame flex flex-col items-center justify-center gap-5'>
      <Image placeholder='blur' src={background} alt='background' className='w-full max-w-sm' />
      <div className='flex flex-col md:flex-row gap-5 md:gap-7'>
        <Link href='/lego/signup' className={style.button}>
          参与报名
        </Link>
        <Link href='/lego/infomation' className={style.button}>
          报名信息
        </Link>
      </div>
    </main>
  );
}
