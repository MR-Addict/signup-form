import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { setMetadata } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import RegisterForm from "./components/RegisterForm";

export const metadata = setMetadata("用户注册");

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <main className='w-full flex-1 frame flex flex-row justify-center'>
      <RegisterForm />
    </main>
  );
}
