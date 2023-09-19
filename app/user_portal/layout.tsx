import type { Metadata } from "next";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "User Portal",
  description: "User Portal",
};

export default async function UserPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between">
      <Navbar />
      <div className="mt-10">{children}</div>
    </div>
  );
}
