import { getServerSession } from "next-auth";

import { getMetadata } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = getMetadata("Home");

export default async function Page() {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <main className='text-blue-600 flex-1 w-full frame'>
      <h1>Hello world</h1>
    </main>
  );
}
