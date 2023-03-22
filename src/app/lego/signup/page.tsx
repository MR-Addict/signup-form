import { Back } from "@/components";
import { lego } from "@/lib/mongodb";
import { SignupForm } from "./components";
import { setMetadata, groupBy } from "@/lib/utils";

export const revalidate = 0;
export const metadata = setMetadata("乐高 • 报名");

export default async function Page() {
  const result = await lego.query();
  if (!result.status || !result.data) throw new Error(result.message);

  const groupedData = groupBy(result.data, (user) => user.group);
  const allGroups = groupedData.data.map((item) => {
    return { count: item.count, group: item.category, type: item.data[0].type };
  });

  return (
    <main className='w-full flex-1 frame flex flex-row items-start justify-between gap-5'>
      <Back link='/lego' />
      <SignupForm allGroups={allGroups} />
      <span className='hidden md:inline'></span>
    </main>
  );
}
