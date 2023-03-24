"use client";

import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSession, signOut } from "next-auth/react";

import style from "./SignOut.module.css";

export default function SignOut() {
  const { data: session } = useSession();

  return (
    <div className={style.frame}>
      <div className='flex flex-col items-center'>
        <div className='hidden md:flex flex-col items-center gap-0'>
          <span className='text-blue-600'>
            <HiOutlineUserCircle size={30} />
          </span>
          {/* @ts-expect-error */}
          <span className='capitalize text-xs'>{session.user?.username}</span>
        </div>

        <button type='button' onClick={() => signOut()} className={style.button}>
          Logout
        </button>
      </div>
      <div className={style.signout}>
        <button type='button' onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}
