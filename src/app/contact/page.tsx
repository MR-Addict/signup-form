import Image from "next/image";

import { Back } from "@/components";
import { setMetadata } from "@/lib/utils";
import qrcode from "@/data/assets/lego-group-qrcode.png";

export const metadata = setMetadata("联系我们");

export default async function Page() {
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
