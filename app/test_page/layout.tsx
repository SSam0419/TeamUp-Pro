import type { Metadata } from "next";

import { Suspense } from "react";

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
    <div className="flex flex-col items-center justify-between  p-[100px]">
      <Suspense fallback={<p>loading ... </p>}>
        <div className="mt-10">{children}</div>
      </Suspense>
    </div>
  );
}
