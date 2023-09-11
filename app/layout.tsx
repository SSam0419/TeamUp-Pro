import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "@/components/TanstackQueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Setember",
  description: "Setember Beta Version, coming soon ... ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`text-sm ${inter.className}`}>
        <ReactQueryClientProvider>
          <div className="flex flex-col items-center justify-between p-[100px]">
            <Toaster />
            {children}
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
