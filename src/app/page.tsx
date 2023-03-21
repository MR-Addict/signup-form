import { getMetadata } from "@/lib/utils";

export const metadata = getMetadata("Home");

export default function Home() {
  return (
    <main className='text-green-600'>
      <h1>Hello world</h1>
    </main>
  );
}
