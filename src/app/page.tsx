import { getMetadata } from "@/lib/utils";

export const metadata = getMetadata("Home");

export default async function Page() {
  return (
    <main className='text-blue-600 flex-1 w-full frame'>
      <h1>Hello world</h1>
    </main>
  );
}
