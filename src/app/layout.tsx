import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-cn'>
      <body>{children}</body>
    </html>
  );
}
