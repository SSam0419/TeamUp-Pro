import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "@/components/TanstackQueryProvider";
import { Toaster } from "react-hot-toast";
import { MyNextUIProvider } from "@/components/NextUIProvider";

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
      <body className="text-black font-normal min-h-screen bg-slate-50">
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
            </div>
          </ReactQueryClientProvider>
        </MyNextUIProvider>
      </body>
    </html>
  );
}
