"use client";

export default function Footer() {
  return (
    <footer aria-label='footer' className='w-full frame text-center'>
      Copyright &copy; {new Date().getFullYear()}. All rights reversed.
    </footer>
  );
}
