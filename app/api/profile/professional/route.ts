import { ProfessionalProfileFormType } from "@/app/professional_portal/profile/_components/ProfessionalProfileForm";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { IndustriesOptions } from "@/types/constants/industries";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({ requestType: "GET", route: "/api/profile/professional/route" });
  const supabase = createRouteHandlerClient({ cookies });

  const { searchParams } = new URL(request.url);

  let query = supabase.from("professional_profile_view").select("*");

  const id = searchParams.get("id");
  const filter = searchParams.get("query");
  const industry = searchParams.get("industry");
  if (id) {
    query.eq("id", id).maybeSingle();
  } else {
    if (filter) {
      const filterArray = filter.split(" ");
      const modifiedArray = filterArray.map((item) => "%" + item + "%");

      const data = await supabase
        .from("professional_skill")
        .select("professional_id")
        .ilikeAnyOf("skill_name", modifiedArray);
      if (data.data == null) {
        return NextResponse.json(data);
      }
      const professionalIds = data.data.map((item) => {
        return item.professional_id;
      });
      console.log(professionalIds);
      query.in("id", professionalIds);
    }
    if (industry) {
      query.eq("industry", industry);
    } else {
      query.eq("industry", IndustriesOptions[0]);
    }
  }

  const data = await query;
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/profile/professional/route",
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
    .upsert(professionalProfile);

  await supabase
    .from("professional_skill")
    .delete()
    .eq("professional_id", professionalProfile.id);

  skills.map(async (skill) => {
    await supabase.from("professional_skill").upsert({
      professional_id: professionalProfile.id,
      skill_name: skill,
    });
  });

  return NextResponse.json(response);
}
