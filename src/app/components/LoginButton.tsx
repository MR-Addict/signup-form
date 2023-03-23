"use client";

import style from "./component.module.css";
import { useLoginContext } from "@/components";

export default function LoginButton() {
  const { openLoginForm } = useLoginContext();

  return (
    <div className='w-full max-w-xs flex flex-col gap-5 md:gap-7'>
      <h1 className='text-lg text-gray-700 text-center'>出于管理的需要，您需要登录后才能参与报名，感谢您的理解</h1>
      <button
        onClick={() => openLoginForm(true)}
        type='button'
        className={[style.button, "bg-blue-600 text-white"].join(" ")}
      >
        去登录
      </button>
    </div>
  );
}
