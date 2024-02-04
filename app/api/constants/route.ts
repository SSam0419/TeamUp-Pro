import { ConsoleLog } from "@/server-actions/utils/logger";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  ConsoleLog({ requestType: "GET", route: "/api/constants" });
  const supabase = createRouteHandlerClient({ cookies });

  const languageOptions = await supabase
    .from("language_options")
    .select("language");
  let _languageOptions: string[] = [];
  let _industriOptions: string[] = [];
  let _baseLocationOptions: string[] = [];

  if (languageOptions.data instanceof Array) {
    _languageOptions = languageOptions.data.map((item) => item.language);
  }

  const industriOptions = await supabase
    .from("industry_options")
    .select("industry");

  if (industriOptions.data instanceof Array) {
    _industriOptions = industriOptions.data.map(
      (industry) => industry.industry
    );
  }
  const baseLocationOptions = await supabase
    .from("base_location_options")
    .select("country");

  if (baseLocationOptions.data instanceof Array) {
    _baseLocationOptions = baseLocationOptions.data.map(
      (country) => country.country
    );
  }

  return NextResponse.json({
    languageOptions: _languageOptions,
    industriOptions: _industriOptions,
    baseLocationOptions: _baseLocationOptions,
  });
}
