import { ConsoleLog } from "@/server-actions/utils/logger";
import { Database } from "@/libs/types/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import { CreateUserProfileFormType } from "@/libs/models/UserProfileClass/UserProfileUtility";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/profile/user/route",
  });
  const supabase = createRouteHandlerClient<Database>({ cookies });
  let query = supabase
    .from("user_profile")
    .select("* , professional_profile(*)");
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
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const userProfileData: CreateUserProfileFormType = await request.json();

  if (userProfileData.id === "") {
    return NextResponse.error();
  }

  const data = await supabase.from("user_profile").upsert({
    id: userProfileData.id,
    introduction: userProfileData.introduction,
    languages: userProfileData.languages,
    firstname: userProfileData.firstname,
    lastname: userProfileData.lastname,
    email: userProfileData.email,
    phone_number: userProfileData.phone_number,
    current_organization: userProfileData.current_organization,
    years_of_experience: userProfileData.years_of_experience,
    github_link: userProfileData.github_link,
    twitter_link: userProfileData.twitter_link,
    linkedin_link: userProfileData.linkedin_link,
    ...(userProfileData.avatar_link !== null && {
      avatar_link: userProfileData.avatar_link,
    }),
  });

  return NextResponse.json(userProfileData);
}
