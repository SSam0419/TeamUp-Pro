import { ConsoleLog } from "@/server-actions/utils/logger";
import { Database } from "@/libs/types/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CreateProfessionalProfileFormType } from "@/libs/models/UserProfileClass/UserProfileUtility";

export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/profile/professional/route",
  });
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const professionalProfile: CreateProfessionalProfileFormType =
    await request.json();

  if (!professionalProfile || professionalProfile.id === "") {
    return NextResponse.json({
      status: 400,
      statusText: "Something went wrong, try again later.",
    });
  }

  const response = await supabase.from("professional_profile").upsert({
    id: professionalProfile.id,
    professional_introduction: professionalProfile.professional_introduction,
    professional_job_title: professionalProfile.professional_job_title,
    availability: professionalProfile.availability,
    hourly_rate: professionalProfile.hourly_rate,
    resume_link: professionalProfile.resume_link,
    skills: professionalProfile.skills,
  });

  return NextResponse.json(response);
}
