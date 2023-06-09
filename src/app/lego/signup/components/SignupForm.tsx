"use client";

import { useRouter } from "next/navigation";
import { IoSchoolOutline } from "react-icons/io5";
import { BiBarChartSquare } from "react-icons/bi";
import { useState, useEffect, useMemo } from "react";
import { BsGenderMale, BsPhone } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineFlagCircle } from "react-icons/md";
import { AiOutlineUser, AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";

import style from "./SignupForm.module.css";
import { LegoUserType } from "@/types";
import { usePopupContext, SpinLoader } from "@/components";

interface Props {
  storedUser?: LegoUserType;
  userId: string;
  groups: { groupId: string; group: string; type: string }[];
}

export default function SignupForm({ storedUser, userId, groups }: Props) {
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
    userId,
    type: "",
  };

  const defaultFormData = useMemo(() => storedUser || emptyFormData, [storedUser]);

  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => setFormData(defaultFormData), [defaultFormData]);

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if infomatin changed
    if (storedUser && JSON.stringify(formData) === JSON.stringify(storedUser))
      return popup({ status: true, message: formData.name + "，你的信息没有任何变动" });

    if (
      storedUser?.leader === "是" &&
      formData.group !== storedUser?.group &&
      groups.find((item) => item.group === formData.group)
    ) {
      popup({ status: false, message: `警告：${formData.group}已被使用` });
      return;
    }

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
              required
              type='text'
              id='name'
              name='name'
              minLength={2}
              maxLength={10}
              onChange={onChange}
              value={formData.name}
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='gender'>
              <BsGenderMale />
              <span>性别</span>
            </label>
            <select
              required
              id='gender'
              name='gender'
              onChange={onChange}
              value={formData.gender}
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
              required
              type='text'
              id='studentId'
              name='studentId'
              maxLength={12}
              minLength={12}
              onChange={onChange}
              className={style.input}
              value={formData.studentId}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='phone'>
              <BsPhone />
              <span>手机号</span>
            </label>
            <input
              required
              type='tel'
              id='phone'
              name='phone'
              maxLength={11}
              minLength={11}
              onChange={onChange}
              value={formData.phone}
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='email'>
              <AiOutlineMail />
              <span>邮箱</span>
            </label>
            <input
              required
              type='email'
              id='email'
              name='email'
              maxLength={30}
              onChange={onChange}
              value={formData.email}
              className={style.input}
            />
          </div>

          <div className={style.element}>
            <label htmlFor='college'>
              <IoSchoolOutline />
              <span>学院</span>
            </label>
            <input
              required
              type='text'
              id='college'
              name='college'
              maxLength={20}
              onChange={onChange}
              className={style.input}
              value={formData.college}
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
                required
                id='leader'
                name='leader'
                value={formData.leader}
                className={style.input}
                disabled={storedUser !== null}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value, group: "", groupId: "", type: "" })
                }
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
                <option value='创意专业兼报'>创意专业兼报</option>
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
                  if (groups.find((item) => e.target.value !== storedUser?.group && item.group === e.target.value))
                    popup({ status: false, message: `警告：${e.target.value}已被使用` });
                }}
                required
                type='text'
                id='group'
                name='group'
                maxLength={10}
                value={formData.group}
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
                required
                id='leader'
                name='leader'
                value={formData.leader}
                className={style.input}
                disabled={storedUser !== null}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value, group: "", groupId: "", type: "" })
                }
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
                    type: groups.find((item) => item.group === e.target.value)?.type || "",
                    groupId: groups.find((item) => item.group === e.target.value)?.groupId || "",
                  });
                }}
                required
                id='group'
                name='group'
                value={formData.group}
                className={style.input}
              >
                <option disabled value=''>
                  -- 请选择 --
                </option>
                {groups.map((item) => (
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
          disabled={isSubmitting}
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
