import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import NavBar from "../../components/NewNavbar";

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
