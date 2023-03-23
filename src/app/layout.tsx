import "./globals.css";

import { NextauthProvider, PopupContextProvider, LoginContextProvider, Footer, Navbar } from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-cn'>
      <body>
        <NextauthProvider>
          <PopupContextProvider>
            <LoginContextProvider>
              {/* @ts-expect-error */}
              <Navbar />
              {children}
              <Footer />
            </LoginContextProvider>
          </PopupContextProvider>
        </NextauthProvider>
      </body>
    </html>
  );
}
