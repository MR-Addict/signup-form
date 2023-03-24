"use client";

import { useSession } from "next-auth/react";

import SignOut from "./SignOut";
import { useLoginContext } from "@/components";

export default function NormalButtons() {
  const { data: session } = useSession();
  const { openLoginForm } = useLoginContext();

  if (session) return <SignOut />;
  else
    return (
      <button
        type='button'
        onClick={() => openLoginForm(true)}
        className='py-1 px-4 rounded-sm outline outline-1 outline-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-300'
      >
        Login
      </button>
    );
}
