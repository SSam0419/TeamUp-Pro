import { ConsoleLog } from "@/server-actions/utils/logger";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/professional/restricted_request/route",
  });
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const industry = searchParams.get("industry");
  const industries = searchParams.get("industries");
  const workmode = searchParams.get("workmode");
  const languages = searchParams.get("languages");

  const query = searchParams.get("query");

  const supabase = createRouteHandlerClient({ cookies });
  let fetchQuery = supabase
    .from("professional_free_request_view")
    .select(` *  `, { count: "exact" });

  if (industries) {
    fetchQuery.filter("industry", "in", `(${industries})`);
  }
  if (languages) {
    const languageArray = languages.split(",");
    const filterLanguage = languageArray
      .map((language) => `language_requirements.cs.{${language}}`)
      .join(",");
    fetchQuery.or(filterLanguage);
  }

  if (workmode) {
    fetchQuery.eq("workmode", workmode);
  }

  if (from && to) {
    fetchQuery = fetchQuery.range(parseInt(from), parseInt(to));
  }
  if (query) fetchQuery = fetchQuery.like("title", `%${query}%`);

  const data = await fetchQuery;
  console.log(data);
  return NextResponse.json(data);
}
