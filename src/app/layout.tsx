import "./globals.css";

import { NextauthProvider, PopupContextProvider, LoginContextProvider, Footer, Navbar } from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-cn'>
      <body>
        <NextauthProvider>
          <LoginContextProvider>
            <PopupContextProvider>
              {/* @ts-expect-error */}
              <Navbar />
              {children}
              <Footer />
            </PopupContextProvider>
          </LoginContextProvider>
        </NextauthProvider>
      </body>
    </html>
  );
}
