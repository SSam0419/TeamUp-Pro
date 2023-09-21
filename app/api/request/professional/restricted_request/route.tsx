import { ConsoleLog } from "@/server-actions/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/professional/restricted_request/route",
  });
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("professional_free_request_view")
    .select(` *  `);
  if (error !== null) return NextResponse.json({ error });
  return NextResponse.json(data);
}
