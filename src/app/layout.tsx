import type { Metadata } from "next";
import localFont from "next/font/local";
import './style/globals.scss';
import DropdownLang from "@/component/DropdownLang";
import I18NProvider from '@/component/I18nProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SWD TEST FRONT-END",
  description: "TEST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18NProvider>
          <DropdownLang/>
          {children}
        </I18NProvider>
      </body>
    </html>
  );
}
