import { ConsoleLog } from "@/server-actions/utils/logger";
import { IndustriesOptions } from "@/types/constants/industries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/professional/restricted_request/route",
  });
  const { searchParams } = new URL(request.url);
  const industry = searchParams.get("industry");
  const query = searchParams.get("query");

  const supabase = createServerComponentClient({ cookies });
  let fetchQuery = supabase
    .from("professional_free_request_view")
    .select(` *  `);
  if (industry) {
    fetchQuery = fetchQuery.eq("industry", industry);
  } else {
    fetchQuery.eq("industry", IndustriesOptions[0]);
  }

  if (query) fetchQuery = fetchQuery.like("title", `%${query}%`);

  const { data, error } = await fetchQuery;

  if (error !== null) return NextResponse.json({ error });
  return NextResponse.json(data);
}
