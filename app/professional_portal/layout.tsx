import type { Metadata } from "next";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Professional Portal",
  description: "Professional Portal",
};

export default function UserPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between  p-[100px] ">
      <Navbar />
      <div className="mt-10">{children}</div>
    </div>
  );
}
