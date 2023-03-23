import { cookies } from "next/headers";

import { Back } from "@/components";
import { lego } from "@/lib/mongodb";
import { SignupForm } from "./components";
import { setMetadata } from "@/lib/utils";

export const revalidate = 0;
export const metadata = setMetadata("创意乐高 • 参与报名");

export default async function Page() {
  const cookieStore = cookies();
  const legoUuid = cookieStore.get("lego.uuid")?.value;

  const result = await lego.query();
  if (!result.status || !result.data) throw new Error(result.message);

  return (
    <main className='w-full flex-1 frame flex flex-row items-start justify-between gap-5'>
      <Back link='/lego' />
      <SignupForm users={result.data} legoUuid={legoUuid} />
      <span className='hidden md:inline'></span>
    </main>
  );
}
