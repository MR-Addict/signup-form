import "./globals.css";

import { NextauthProvider, PopupContextProvider, Footer, Navbar } from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-cn'>
      <body>
        <NextauthProvider>
          <PopupContextProvider>
            {/* @ts-expect-error */}
            <Navbar />
            {children}
            <Footer />
          </PopupContextProvider>
        </NextauthProvider>
      </body>
    </html>
  );
}
