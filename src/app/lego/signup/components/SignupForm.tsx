"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSchoolOutline } from "react-icons/io5";
import { BiBarChartSquare } from "react-icons/bi";
import { BsGenderMale, BsPhone } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineFlagCircle } from "react-icons/md";
import { AiOutlineUser, AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";

import style from "./SignupForm.module.css";
import { usePopupContext, SpinLoader } from "@/components";

const defaultFormData = {
  name: "",
  gender: "",
  studentId: "",
  phone: "",
  email: "",
  college: "",
  leader: "是",
  group: "",
  type: "",
};

const maxUsers = 4;

export default function SignupForm({ allGroups }: { allGroups: { count: number; group: string; type: string }[] }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  function onChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    fetch("/api/lego/insert", {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) {
          setFormData(defaultFormData);
          router.refresh();
        } else console.error(result.message);
        setIsSubmitting(false);
      })
      .catch((error) => {
        popup({ status: false, message: "提交失败" });
        console.error(error);
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div>
        <h1 className='textlg text-gray-700'>个人信息</h1>
        <div className={style.group}>
          <div className={style.element}>
            <label htmlFor='name'>
              <AiOutlineUser />
              <span>姓名</span>
            </label>
            <input
              onChange={onChange}
              required
              value={formData.name}
              type='text'
              id='name'
              name='name'
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='gender'>
              <BsGenderMale />
              <span>性别</span>
            </label>
            <select
              onChange={onChange}
              required
              value={formData.gender}
              id='gender'
              name='gender'
              className={style.input}
            >
              <option disabled value=''>
                -- 请选择 --
              </option>
              <option value='男'>男</option>
              <option value='女'>女</option>
            </select>
          </div>

          <div className={style.element}>
            <label htmlFor='studentId'>
              <AiOutlineIdcard />
              <span>学号</span>
            </label>
            <input
              onChange={onChange}
              required
              value={formData.studentId}
              type='number'
              id='studentId'
              name='studentId'
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='phone'>
              <BsPhone />
              <span>手机号</span>
            </label>
            <input
              onChange={onChange}
              required
              value={formData.phone}
              type='number'
              id='phone'
              name='phone'
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='email'>
              <AiOutlineMail />
              <span>邮箱</span>
            </label>
            <input
              onChange={onChange}
              required
              value={formData.email}
              type='email'
              id='email'
              name='email'
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='college'>
              <IoSchoolOutline />
              <span>学院</span>
            </label>
            <input
              onChange={onChange}
              required
              value={formData.college}
              type='text'
              id='college'
              name='college'
              className={style.input}
            />
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-lg text-gray-700'>小组信息</h1>
        <div className={style.group}>
          <div className={style.element}>
            <label htmlFor='leader'>
              <HiOutlineUserGroup />
              <span>小组队长</span>
            </label>
            <select
              onChange={onChange}
              required
              value={formData.leader}
              id='leader'
              name='leader'
              className={style.input}
            >
              <option value='是'>是</option>
              <option value='否'>否</option>
            </select>
          </div>

          {formData.leader === "是" ? (
            <>
              <div className={style.element}>
                <label htmlFor='type'>
                  <MdOutlineFlagCircle />
                  <span>小组赛道</span>
                </label>
                <select
                  onChange={onChange}
                  required
                  value={formData.type}
                  id='type'
                  name='type'
                  className={style.input}
                >
                  <option disabled value=''>
                    -- 请选择 --
                  </option>
                  <option value='创意赛'>创意赛</option>
                  <option value='专业赛'>专业赛</option>
                </select>
              </div>

              <div className={style.element}>
                <label htmlFor='group'>
                  <BiBarChartSquare />
                  <span>小组名称</span>
                </label>
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.name]: e.target.value });
                    if (allGroups.find((item) => item.group === e.target.value))
                      popup({ status: false, message: e.target.value + "已被使用" });
                  }}
                  required
                  value={formData.group}
                  type='text'
                  id='group'
                  name='group'
                  className={style.input}
                />
              </div>
            </>
          ) : (
            <div className={style.element}>
              <label htmlFor='group'>
                <BiBarChartSquare />
                <span>小组名称</span>
              </label>
              <select
                onChange={onChange}
                required
                value={formData.group}
                id='group'
                name='group'
                className={style.input}
              >
                <option disabled value=''>
                  -- 请选择 --
                </option>
                {allGroups.map((item) => (
                  <option key={item.group} disabled={item.count >= maxUsers} value={item.group}>
                    {item.group}-{item.type}
                    {item.count >= maxUsers && "(人数已满)"}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-row justify-end'>
        <button
          type='submit'
          className={[
            style.submit,
            isSubmitting ? style.deactive : style.active,
            isSubmitting ? "bg-gray-500/50" : "outline outline-1 outline-blue-600 bg-blue-600 text-white",
          ].join(" ")}
        >
          {isSubmitting ? (
            <span className='flex flex-row items-center px-1'>
              <SpinLoader size='1.5rem' />
            </span>
          ) : (
            <span>提交</span>
          )}
        </button>
      </div>
    </form>
  );
}
