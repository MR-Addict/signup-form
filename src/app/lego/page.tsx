import Link from "next/link";
import Image from "next/image";

import style from "./page.module.css";
import { setMetadata } from "@/lib/utils";
import background from "@/data/assets/legobg.png";

export const metadata = setMetadata("创意乐高");

export default async function Page() {
  return (
    <main className='background w-full flex-1 frame flex flex-col items-center justify-center gap-5'>
      <Image src={background} alt='background' className='w-full max-w-xs' />
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
