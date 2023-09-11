import type { Metadata } from "next";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "User Portal",
  description: "User Portal",
};

export default function UserPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between">
      <Navbar />
      {children}
    </div>
  );
}
