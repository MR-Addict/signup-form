import { getServerSession } from "next-auth/next";

import { Back } from "@/components";
import { lego } from "@/lib/mongodb";
import style from "./page.module.css";
import { groupBy, setMetadata } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = setMetadata("创意乐高 • 报名信息");

export default async function Page() {
  const result = await lego.query();
  if (!result.status || !result.data) throw new Error(result.message);

  const session = await getServerSession(authOptions);
  const loginUser = session?.user;

  // @ts-expect-error
  const groupedData = groupBy(result.data, (user) => user.groupId);

  return (
    <main className='w-full frame flex-1 flex flex-row gap-5'>
      <Back link='/lego' />
      <div className='w-full flex flex-col gap-5'>
        {groupedData.data.map((group) => (
          <div key={group.data[0].group} className='flex flex-col gap-1'>
            <h1 className='text-gray-700 font-semibold text-lg'>{group.data[0].group}</h1>
            <div className='w-full overflow-x-auto shadow-lg'>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>学号</th>
                    {/* @ts-expect-error */}
                    {loginUser && loginUser.role !== "user" && (
                      <>
                        <th>手机</th>
                        <th>邮箱</th>
                      </>
                    )}
                    <th>专业</th>
                    <th>小组名称</th>
                    <th>小组赛道</th>
                  </tr>
                </thead>
                <tbody>
                  {group.data.map((user, index) => (
                    <tr key={user.userId} style={{ color: user.leader === "是" ? "green" : "" }}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.gender}</td>
                      <td>{user.studentId}</td>
                      {/* @ts-expect-error */}
                      {loginUser && loginUser.role !== "user" && (
                        <>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                        </>
                      )}
                      <td>{user.college}</td>
                      <td>{user.group}</td>
                      <td>{user.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <span className='hidden md:inline'></span>
    </main>
  );
}
