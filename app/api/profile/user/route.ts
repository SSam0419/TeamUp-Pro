import { UserProfileFormType } from "@/app/user_portal/profile/_components/UserProfileForm";
import supabase from "@/server-actions/supabase/supabase";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/profile/user/route",
  });
  const supabase = createRouteHandlerClient({ cookies });
  let query = supabase.from("user_profile").select();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  if (id) {
    query.eq("id", id);
  }
  if (email) {
    query.eq("email", email);
  }

  const data = await query.maybeSingle();

  return NextResponse.json(data);
}

// CREATE PROFILE/UPDATE PROFILE
export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/profile/user/route",
  });
  const supabase = createRouteHandlerClient({ cookies });
  const userProfileData: UserProfileFormType = await request.json();

  if (userProfileData.id === "") {
    return NextResponse.error();
  }

  console.log("userProfileData: ", userProfileData);
  const data = await supabase.from("user_profile").upsert({
    id: userProfileData.id,
    bio: userProfileData.bio,
    username: userProfileData.username,
    firstname: userProfileData.firstname,
    lastname: userProfileData.lastname,
    email: userProfileData.email,
    phone_number: userProfileData.phone_number,
    occupation: userProfileData.occupation,
    ...(userProfileData.avatar_file !== null && {
      avatar_link: userProfileData.avatar_link,
    }),
  });

  console.log(data);
  return NextResponse.json(userProfileData);
}
