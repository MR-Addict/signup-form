import Image from "next/image";
import { getServerSession } from "next-auth";

import { Back } from "@/components";
import qrcode from "@/data/assets/lego-group-qrcode.png";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className='w-full frame flex flex-row justify-between gap-5'>
      <Back link='/' />
      <div className='flex flex-col md:flex-row gap-10'>
        <Image src={qrcode} alt='lego-group-qrcode' className='max-w-xs rounded-md shadow-xl' />
        <Image src={qrcode} alt='football-group-qrcode' className='max-w-xs rounded-md shadow-xl' />
      </div>
      <span></span>
    </main>
  );
}
