import type { Metadata } from "next";

import NavBar from "../../components/NewNavbar";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

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
      {/* <Navbar /> */}
      {/* <div className="flex gap-3">
        <Link href="/user_portal">aaaaaaaaa</Link>
        <Link href="/user_portal/find_talents">bbbbbbbbbb</Link>
        <Link href="/user_portal">cccccccc</Link>
        <ProfileCard isUserCard={true} />
      </div> */}
      <NavBar
        isUserPortal={true}
        menuItems={[
          {
            name: "Dashboard",
            link: "/user_portal",
          },
          {
            name: "Talents",
            link: "/user_portal/find_talents",
          },
          {
            name: "FAQ",
            link: "/user_portal/faq",
          },
        ]}
      />
      <div className="mt-10">{children}</div>
    </div>
  );
}
