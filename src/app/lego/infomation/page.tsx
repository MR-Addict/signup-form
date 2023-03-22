import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import style from "./page.module.css";
import { lego } from "@/lib/mongodb";
import { groupBy, setMetadata } from "@/lib/utils";

export const revalidate = 0;
export const metadata = setMetadata("乐高 • 信息");

export default async function Page() {
  const result = await lego.query();
  if (!result.status || !result.data) throw new Error(result.message);

  const groupedData = groupBy(result.data, (user) => user.group);

  return (
    <main className='w-full frame flex-1 flex flex-row gap-5'>
      <Link href='/lego' aria-label='back link' className='hidden md:inline text-blue-600'>
        <BiArrowBack size='20' />
      </Link>
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
                  <th>学号</th>
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
                    <td>{user.studentId}</td>
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
