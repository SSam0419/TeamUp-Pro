import { ConsoleLog } from "@/server-actions/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/single_request_details/route",
  });
  const supabase = createServerComponentClient({ cookies });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const requestDetailsFromUserId = await supabase
    .from("request_details")
    .select(`* , user_profile(*), professional_pitch(*)`)
    .eq("id", id)
    .single();
  return NextResponse.json(requestDetailsFromUserId);
}
