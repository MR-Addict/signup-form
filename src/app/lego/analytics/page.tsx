import { getServerSession } from "next-auth/next";

import { lego } from "@/lib/mongodb";
import { setMetadata } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export const metadata = setMetadata("数据统计");

export default async function Analytics() {
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const userRole = session?.user?.role;
  if (userRole !== "admin") redirect("/lego");

  const result = await lego.query();
  if (!result.status || !result.data) throw new Error(result.message);

  const totalCount = result.data.length;
  const groupCount = result.data.filter((item) => item.leader === "是").length;
  const creativeGroupCount = result.data.filter((item) => item.leader === "是" && item.type === "创意组").length;
  const professionGroupCount = result.data.filter((item) => item.leader === "是" && item.type === "专业组").length;
  const bothGroupCount = result.data.filter((item) => item.leader === "是" && item.type === "创意专业兼报").length;

  return (
    <main className='w-full frame flex-1 flex flex-col gap-1'>
      <h1>报名总人数：{totalCount}</h1>
      <h1>报名小组数：{groupCount}</h1>
      <h1>创意小组数：{creativeGroupCount}</h1>
      <h1>专业小组数：{professionGroupCount}</h1>
      <h1>创意专业兼报小组数：{bothGroupCount}</h1>
    </main>
  );
}
