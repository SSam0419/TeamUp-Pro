import type { Metadata } from "next";
import { FaHospitalUser } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
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
            icon: <BsFillPostcardFill />,
          },
          {
            name: "Talents",
            link: "/user_portal/find_talents",
            icon: <FaHospitalUser />,
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
