import type { Metadata } from "next";
import { Suspense } from "react";
import NavBar from "@/components/Navbar";
import { MdSpaceDashboard } from "react-icons/md";
import { HiPresentationChartLine } from "react-icons/hi2";

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
    <div className="flex flex-col items-center justify-between">
      <NavBar
        key="professional"
        portalType="professional"
        menuItems={[
          {
            name: "Dashboard",
            link: "/professional_portal",
            icon: <MdSpaceDashboard />,
          },
          {
            name: "Pitch",
            link: "/professional_portal/my_pitch",
            icon: <HiPresentationChartLine />,
          },
          // {
          //   name: "Mailbox",
          //   link: "/professional_portal/mailbox",
          // },
        ]}
      />
      <Suspense fallback={<p>loading ... </p>}>
        <div className="mt-20">{children}</div>
      </Suspense>
    </div>
  );
}
