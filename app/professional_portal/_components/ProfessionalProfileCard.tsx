import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Session } from "@supabase/supabase-js";

const ProfessionalProfileCard = ({ session }: { session: Session | null }) => {
  return (
    <Link
      href={"/professional_portal/profile"}
      className="flex items-center space-x-2"
    >
      <Image
        className="w-10 h-10 rounded-full"
        loader={({ src }) => src}
        src={session?.user?.user_metadata?.avatar_url || ""}
        alt=""
        width={40}
        height={40}
      />
      <span className="text-gray-800">
        {session?.user?.user_metadata?.user_name || session?.user?.id}
      </span>
    </Link>
  );
};

export default ProfessionalProfileCard;
