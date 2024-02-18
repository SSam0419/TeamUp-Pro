import { Database } from "@/libs/types/database";
import { createServerSideClient } from "@/server-actions/supabase/server";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/professional/restricted_request/route",
  });
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const industries = searchParams.get("industries");
  const workmode = searchParams.get("workmode");
  const languages = searchParams.get("languages");
  const location = searchParams.get("location");
  const status = searchParams.get("status");
  const lower_budget = searchParams.get("lower_budget");
  const upper_budget = searchParams.get("upper_budget");

  const query = searchParams.get("query");

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  // const supabase = createServerSideClient(cookies());

  let fetchQuery = supabase
    .from("professional_free_request_view")
    .select(` *  `, { count: "exact" });

  if (location) {
    fetchQuery.eq("base_location", location);
  }

  if (status) {
    fetchQuery.eq("status", status);
  }

  if (lower_budget) {
    fetchQuery.gte("budget_upper_limit", lower_budget);
  }

  if (upper_budget) {
    fetchQuery.lte("budget_upper_limit", upper_budget);
  }

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

  const data = await fetchQuery.order("created_at", { ascending: false });

  return NextResponse.json(data);
}
