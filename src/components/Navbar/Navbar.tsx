import Link from "next/link";
import Image from "next/image";

import logo from "@/data/assets/logo.svg";
import { NormalNavbar, MobileNavbar, Login } from "./components";

export default async function Navbar() {
  return (
    <nav aria-label='navbar' className='py-5 px-5 md:px-48 w-full flex flex-row items-center justify-between'>
      <Image src={logo} alt='logo' height='35' />
      <NormalNavbar />
      <div className='flex flex-row gap-4'>
        <Login />
        <MobileNavbar />
      </div>
    </nav>
  );
}
