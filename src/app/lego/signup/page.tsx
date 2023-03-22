import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import { setMetadata } from "@/lib/utils";
import { SignupForm } from "./components";

export const metadata = setMetadata("乐高 • 报名");

export default function Page() {
  return (
    <main className='w-full flex-1 frame flex flex-row items-start justify-between gap-5'>
      <Link href='/lego' aria-label='back link' className='hidden md:inline text-blue-600'>
        <BiArrowBack size='20' />
      </Link>
      <SignupForm />
      <span className='hidden md:inline'></span>
    </main>
  );
}
