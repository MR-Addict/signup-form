import { getServerSession } from "next-auth";

import { Back } from "@/components";
import { lego } from "@/lib/mongodb";
import style from "./page.module.css";
import { groupBy, setMetadata } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = setMetadata("乐高 • 信息");

export default async function Page() {
  const session = await getServerSession(authOptions);

  const result = await lego.query();
  if (!result.status || !result.data) throw new Error(result.message);

  const groupedData = groupBy(result.data, (user) => user.group);

  return (
    <main className='w-full frame flex-1 flex flex-row gap-5'>
      <Back link='/lego' />
      <div className='w-full flex flex-col gap-4'>
        {groupedData.data.map((group) => (
          <div key={group.category}>
            <h1 className='text-gray-700 font-semibold'>
              {group.category}-{group.data[0].type}
            </h1>
            <div className='w-full overflow-x-auto'>
              <table className={style.table}>
                <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>赛道</th>
                  <th>学号</th>
                  {session && (
                    <>
                      <th>手机</th>
                      <th>邮箱</th>
                    </>
                  )}
                  <th>专业</th>
                </tr>
                {group.data.map((user, index) => (
                  <tr key={user.studentId}>
                    <td>{index + 1}</td>
                    <td>
                      {user.name}
                      {user.leader === "是" && <span className='text-green-600 font-semibold ml-1'>(队长)</span>}
                    </td>
                    <td>{user.gender}</td>
                    <td>{user.type}</td>
                    <td>{user.studentId}</td>
                    {session && (
                      <>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                      </>
                    )}
                    <td>{user.college}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        ))}
      </div>
      <span className='hidden md:inline'></span>
    </main>
  );
}
