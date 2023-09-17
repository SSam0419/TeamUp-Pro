import { ProfessionalProfileFormType } from "@/app/professional_portal/profile/_components/ProfessionalProfileForm";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
  const supabase = createRouteHandlerClient({ cookies });
  const {
    professionalProfile,
    skills,
  }: { professionalProfile: ProfessionalProfileFormType; skills: string[] } =
    await request.json();

  if (professionalProfile.id === "") {
    return NextResponse.error();
  }

  console.log(professionalProfile);

  const response = await supabase
    .from("professional_profile")
    .insert(professionalProfile);

  console.log(response);
  skills.map(async (skill) => {
    const res = await supabase.from("professional_skill").insert({
      professional_id: professionalProfile.id,
      skill_name: skill,
    });
    console.log(res);
  });

  return NextResponse.json(response);
}
