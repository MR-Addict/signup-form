"use client";

import style from "./component.module.css";
import { useLoginContext } from "@/components";

export default function LoginButton() {
  const { openLoginForm } = useLoginContext();

  return (
    <button
      onClick={() => openLoginForm(true)}
      type='button'
      className={[style.button, "bg-blue-600 text-white"].join(" ")}
    >
      去登录
    </button>
  );
}
