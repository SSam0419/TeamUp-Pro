import type { Metadata } from "next";

import NavBar from "../../components/Navbar";

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
      <NavBar
        key="user"
        portalType="user"
        menuItems={[
          {
            name: "Dashboard",
            link: "/user_portal",
          },
          {
            name: "Talents",
            link: "/user_portal/find_talents",
          },
          // {
          //   name: "Mailbox",
          //   link: "/user_portal/mailbox",
          // },
        ]}
      />
      <div className="mt-20">{children}</div>
    </div>
  );
}
