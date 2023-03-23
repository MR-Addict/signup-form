"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoSchoolOutline } from "react-icons/io5";
import { BiBarChartSquare } from "react-icons/bi";
import { BsGenderMale, BsPhone } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineFlagCircle } from "react-icons/md";
import { AiOutlineUser, AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";

import { groupBy } from "@/lib/utils";
import { LegoUserType } from "@/types";
import style from "./SignupForm.module.css";
import { usePopupContext, SpinLoader } from "@/components";

const emptyFormData = {
  name: "",
  gender: "",
  studentId: "",
  phone: "",
  email: "",
  college: "",
  leader: "否",
  group: "",
  groupId: "",
  type: "",
};

export default function SignupForm({ users, legoUuid }: { users: LegoUserType[]; legoUuid: string | undefined }) {
  const groupedData = groupBy(users, (user) => user.group);
  const allGroups = groupedData.data.map((item) => {
    return { count: item.count, group: item.category, groupId: item.data[0].groupId, type: item.data[0].type };
  });

  const storedUser = users.find((user) => user._id === legoUuid);
  const defaultFormData = storedUser || emptyFormData;

  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  function onChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if infomatin changed
    if (JSON.stringify(formData) === JSON.stringify(storedUser))
      return popup({ status: true, message: formData.name + "，你的信息没有任何变动" });

    setIsSubmitting(true);
    fetch(`/api/lego/${storedUser ? "update" : "insert"}`, {
      method: storedUser ? "PUT" : "POST",
      body: new URLSearchParams(formData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
      })
      .catch((error) => {
        popup({ status: false, message: "报名失败" });
        console.error(error);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className='flex flex-col gap-1'>
        <h1 className='text-lg font-semibold text-gray-700'>个人信息</h1>
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
              minLength={2}
              maxLength={10}
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
              type='text'
              id='studentId'
              name='studentId'
              maxLength={12}
              minLength={12}
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
              type='tel'
              id='phone'
              name='phone'
              maxLength={11}
              minLength={11}
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
              maxLength={30}
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
              maxLength={20}
              className={style.input}
            />
          </div>
        </div>
      </div>

      {/* leader */}
      {formData.leader === "是" ? (
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold text-gray-700'>小组信息</h1>
          <div className={style.group}>
            <div className={style.element}>
              <label htmlFor='leader'>
                <HiOutlineUserGroup />
                <span>小组队长</span>
              </label>
              <select
                onChange={onChange}
                disabled={storedUser !== undefined}
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

            <div className={style.element}>
              <label htmlFor='type'>
                <MdOutlineFlagCircle />
                <span>小组赛道</span>
              </label>
              <select onChange={onChange} required value={formData.type} id='type' name='type' className={style.input}>
                <option disabled value=''>
                  -- 请选择 --
                </option>
                <option value='创意组'>创意组</option>
                <option value='专业组'>专业组</option>
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
                  if (allGroups.find((item) => e.target.value !== storedUser?.group && item.group === e.target.value))
                    popup({ status: false, message: `警告：${e.target.value}已被使用` });
                }}
                required
                value={formData.group}
                type='text'
                id='group'
                name='group'
                maxLength={10}
                className={style.input}
              />
            </div>
          </div>
        </div>
      ) : (
        // none-leader
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold text-gray-700'>小组信息</h1>
          <div className={style.group}>
            <div className={style.element}>
              <label htmlFor='leader'>
                <HiOutlineUserGroup />
                <span>小组队长</span>
              </label>
              <select
                onChange={onChange}
                required
                disabled={storedUser !== undefined}
                value={formData.leader}
                id='leader'
                name='leader'
                className={style.input}
              >
                <option value='是'>是</option>
                <option value='否'>否</option>
              </select>
            </div>

            <div className={style.element}>
              <label htmlFor='group'>
                <BiBarChartSquare />
                <span>小组名称</span>
              </label>
              <select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    type: allGroups.find((item) => item.group === e.target.value)?.type || "",
                    groupId: allGroups.find((item) => item.group === e.target.value)?.groupId || "",
                  });
                }}
                required
                disabled={storedUser !== undefined}
                value={formData.group}
                id='group'
                name='group'
                className={style.input}
              >
                <option disabled value=''>
                  -- 请选择 --
                </option>
                {allGroups.map((item) => (
                  <option key={item.group} value={item.group}>
                    {item.group}•{item.type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

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
            <span>{storedUser ? "更新" : "提交"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
