import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NhostProviderWrapper from "@/components/NhostProviderWrapper";
import Sidebar from "@/components/Common/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BlogForge",
  description: "A highly interactive mini-blog channel and content platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100 selection:bg-violet-500 selection:text-white">
        <NhostProviderWrapper>
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
            {children}
          </div>
        </NhostProviderWrapper>
      </body>
    </html>
  );
}
