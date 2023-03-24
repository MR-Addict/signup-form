"use client";

import { useState } from "react";
import { FaUserAlt, FaUnlock, FaUnlockAlt } from "react-icons/fa";

import style from "./RegisterForm.module.css";
import { usePopupContext } from "@/components";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [formData, setFormData] = useState({ username: "", password: "", repeatedPassword: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.repeatedPassword !== formData.password) {
      popup({ status: false, message: "两次密码不相同" });
      setFormData({ ...formData, repeatedPassword: "" });
      return;
    }

    fetch("/api/register", {
      method: "POST",
      body: new URLSearchParams({ username: formData.username, password: formData.password }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.push("/");
        else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "注册失败" });
      });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1 className='font-bold text-3xl text-center'>用户注册</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='registeUsername' className='flex flex-row items-center gap-2 text-gray-700'>
            <FaUserAlt />
            <span>用户名</span>
          </label>
          <input
            required
            type='text'
            id='registeUsername'
            name='username'
            autoComplete='off'
            maxLength={10}
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='registePassword' className='flex flex-row items-center gap-2 text-gray-700'>
            <FaUnlock />
            <span>密码</span>
          </label>
          <input
            required
            id='registePassword'
            type='password'
            name='password'
            autoComplete='off'
            maxLength={100}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>

        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='repeatedPassword' className='flex flex-row items-center gap-2 text-gray-700'>
            <FaUnlockAlt />
            <span>确认密码</span>
          </label>
          <input
            required
            id='repeatedPassword'
            type='password'
            name='repeatedPassword'
            autoComplete='off'
            maxLength={100}
            value={formData.repeatedPassword}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>

        <button
          disabled={formData.password === "" || formData.username === "" || formData.repeatedPassword === ""}
          type='submit'
        >
          登录
        </button>
      </div>
    </form>
  );
}
