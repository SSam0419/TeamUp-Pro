import { ConsoleLog } from "@/server-actions/utils/logger";
import { IndustriesOptions } from "@/app/_types/constants/industries";
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
  const query = searchParams.get("query");

  const supabase = createRouteHandlerClient({ cookies });
  let fetchQuery = supabase
    .from("professional_free_request_view")
    .select(` *  `, { count: "exact" });
  if (industry) {
    fetchQuery = fetchQuery.eq("industry", industry);
  } else {
    fetchQuery = fetchQuery.eq("industry", IndustriesOptions[0]);
  }
  if (from && to) {
    fetchQuery = fetchQuery.range(parseInt(from), parseInt(to));
  }
  if (query) fetchQuery = fetchQuery.like("title", `%${query}%`);

  const data = await fetchQuery;

  return NextResponse.json(data);
}
