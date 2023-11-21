import type { Metadata } from "next";
import { Suspense } from "react";
import NavBar from "@/components/Navbar";

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
      {/* <Navbar /> */}
      <NavBar
        portalType="professional"
        menuItems={[
          {
            name: "Dashboard",
            link: "/professional_portal",
          },
          {
            name: "Pitch",
            link: "/professional_portal/my_pitch",
          },
          {
            name: "Mailbox",
            link: "/professional_portal/mailbox",
          },
          // {
          //   name: "FAQ",
          //   link: "/professional_portal/faq",
          // },
        ]}
      />
      <Suspense fallback={<p>loading ... </p>}>
        <div className="mt-10">{children}</div>
      </Suspense>
    </div>
  );
}
