import { UserProfileFormType } from "@/app/user_portal/profile/_components/UserProfileForm";
import supabase from "@/server-actions/supabase/supabase";
import { ConsoleLog } from "@/server-actions/utils/logger";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/profile/user/route",
  });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await supabase
    .from("user_profile")
    .select()
    .eq("id", id)
    .maybeSingle();

  return NextResponse.json(data);
}

// CREATE PROFILE/UPDATE PROFILE
export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/profile/user/route",
  });
  const userProfileData: UserProfileFormType = await request.json();
  console.log("userProfileData: ", userProfileData);

  if (userProfileData.id === "") {
    return NextResponse.error();
  }

  const data = await supabase.from("user_profile").upsert(userProfileData);

  console.log(data);
  return NextResponse.json(userProfileData);
}
