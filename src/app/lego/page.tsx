import Link from "next/link";
import Image from "next/image";

import { getServerSession } from "next-auth/next";

import { setMetadata } from "@/lib/utils";
import { LoginButton } from "../components";
import background from "@/data/assets/legobg.png";
import style from "../components/component.module.css";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = setMetadata("创意乐高");

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className='background w-full flex-1 frame flex flex-col items-center justify-center gap-5'>
      <Image placeholder='blur' src={background} alt='background' className='w-full max-w-md' />

      <div className='w-full max-w-sm flex flex-col gap-5 md:gap-7'>
        {!session && (
          <h1 className='text-lg text-gray-700 text-center'>出于管理的需要，您需要登录后才能参与报名，感谢您的理解</h1>
        )}
        <div className='flex flex-col md:flex-row gap-5 md:gap-7'>
          {session ? (
            <Link href='/lego/signup' className={[style.button, "bg-blue-600 text-white"].join(" ")}>
              参与报名
            </Link>
          ) : (
            <LoginButton />
          )}
          <Link href='/lego/infomation' className={[style.button, "bg-blue-600 text-white"].join(" ")}>
            报名信息
          </Link>

          {/* @ts-expect-error */}
          {session?.user?.role === "admin" && (
            <Link href='/lego/analytics' className={[style.button, "bg-blue-600 text-white"].join(" ")}>
              数据统计
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
