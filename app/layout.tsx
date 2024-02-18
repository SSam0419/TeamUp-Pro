import "./globals.css";
import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/components/Providers/TanstackQueryProvider";
import { Toaster } from "react-hot-toast";
import { MyNextUIProvider } from "@/components/Providers/NextUIProvider";
import { Analytics } from "@vercel/analytics/react";

import { Roboto } from "next/font/google";
import NavBar from "@/components/Navbar";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

const fontFamily = Roboto({
  weight: ["100", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: { icon: "favicon.ico", apple: "favicon.ico" },
  title: "TeamUpPro",
  description: "TeamUpPro Beta Version, coming soon ... ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`text-black font-normal min-h-screen bg-slate-50 ${fontFamily.className}`}
      >
        <MyNextUIProvider>
          <ReactQueryClientProvider>
            <div className="flex flex-col items-center justify-between">
              <Toaster
                toastOptions={{
                  className: "",
                  style: {
                    // border: "1px solid #713200",
                    padding: "16px",
                    color: "black",
                    background: "white",
                  },
                  position: "bottom-right",
                }}
              />

              {children}
              <Analytics />
            </div>
          </ReactQueryClientProvider>
        </MyNextUIProvider>
      </body>
    </html>
  );
}
