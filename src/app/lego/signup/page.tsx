import { getServerSession } from "next-auth/next";

import { Back } from "@/components";
import { lego } from "@/lib/mongodb";
import { SignupForm } from "./components";
import { setMetadata } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export const revalidate = 0;
export const metadata = setMetadata("创意乐高 • 参与报名");

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/lego");
  // @ts-expect-error
  const userId: string = session?.user._id;

  const result = await lego.signupUserAndGroups(userId);
  const data = result?.data;
  if (!data) throw new Error(result?.message);

  return (
    <main className='w-full flex-1 frame flex flex-row items-start justify-between gap-5'>
      <Back link='/lego' />
      <SignupForm storedUser={data.user} groups={data.groups} userId={userId} />
      <span className='hidden md:inline'></span>
    </main>
  );
}
