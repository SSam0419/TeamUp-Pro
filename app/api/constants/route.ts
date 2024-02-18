import { ConsoleLog } from "@/server-actions/utils/logger";
import { Database } from "@/libs/types/database";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  ConsoleLog({ requestType: "GET", route: "/api/constants" });
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const languageOptions = await supabase
    .from("language_options")
    .select("language");
  let _languageOptions: string[] = [];
  let _industriOptions: string[] = [];
  let _baseLocationOptions: string[] = [];
  let _skillset: {}[] = [];

  if (languageOptions.data instanceof Array) {
    _languageOptions = languageOptions.data
      .filter((item) => item.language !== null)
      .map((item) => item.language as string);
  }

  const industriOptions = await supabase
    .from("industry_options")
    .select("industry");

  if (industriOptions.data instanceof Array) {
    _industriOptions = industriOptions.data
      .filter((item) => item.industry !== null)
      .map((industry) => industry.industry as string);
  }
  const baseLocationOptions = await supabase
    .from("base_location_options")
    .select("country");

  if (baseLocationOptions.data instanceof Array) {
    _baseLocationOptions = baseLocationOptions.data
      .filter((item) => item.country !== null)
      .map((country) => country.country as string);
  }

  const skillsetOptions = await supabase
    .from("professional_skillset")
    .select("skill,industry_options(industry)");

  if (skillsetOptions.data instanceof Array) {
    _skillset = skillsetOptions.data
      .filter((item) => item.skill !== null)
      .map((item) => {
        return {
          skill: item.skill,
          industry: item.industry_options?.industry,
        };
      });
  }

  return NextResponse.json({
    languageOptions: _languageOptions,
    industriOptions: _industriOptions,
    baseLocationOptions: _baseLocationOptions,
    skillset: _skillset,
  });
}
