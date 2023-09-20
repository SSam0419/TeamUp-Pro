import { ProfessionalProfileFormType } from "@/app/professional_portal/profile/_components/ProfessionalProfileForm";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({ requestType: "GET", route: "/api/professional/profile/route" });
  const supabase = createRouteHandlerClient({ cookies });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await supabase
    .from("professional_profile")
    .select()
    .eq("id", id)
    .single();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/professional/profile/route",
  });
  const supabase = createRouteHandlerClient({ cookies });
  const {
    professionalProfile,
    skills,
  }: { professionalProfile: ProfessionalProfileFormType; skills: string[] } =
    await request.json();

  if (professionalProfile.id === "") {
    return NextResponse.error();
  }

  const response = await supabase
    .from("professional_profile")
    .insert(professionalProfile);

  skills.map(async (skill) => {
    const res = await supabase.from("professional_skill").insert({
      professional_id: professionalProfile.id,
      skill_name: skill,
    });
  });

  return NextResponse.json(response);
}
