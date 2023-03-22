import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Back({ link }: { link: string }) {
  return (
    <Link href={link} aria-label='back link' className='hidden md:inline text-blue-600'>
      <BiArrowBack size='20' />
    </Link>
  );
}
