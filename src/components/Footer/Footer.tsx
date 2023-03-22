"use client";

export default function Footer() {
  return (
    <footer aria-label='footer' className='w-full frame text-center text-gray-700'>
      Copyright &copy; {new Date().getFullYear()}. All rights reversed.
    </footer>
  );
}
