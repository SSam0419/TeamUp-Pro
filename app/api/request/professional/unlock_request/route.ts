import { ConsoleLog } from "@/server-actions/utils/logger";
import { Database } from "@/libs/types/database";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

//get a unlocked request
export async function GET(request: NextRequest) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/professional/unlock_request/route",
  });

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const { searchParams } = new URL(request.url);
  const request_id = searchParams.get("request_id");
  const professional_id = searchParams.get("professional_id");

  if (professional_id == null || request_id == null)
    return new NextResponse("Error", {
      status: 404,
      statusText: "ERROR : Missing Request Id",
    });

  //fetching request details
  const { data, error } = await supabase
    .from("request_details")
    .select("*, user_profile(*)")
    .eq("id", request_id)
    .single();

  if (error?.code === "PGRST116")
    return new NextResponse("Error", {
      status: 400,
      statusText: "Unauthorized ! Make Sure You Have Unlocked The Request",
    });

  if (error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });

  //fetching pitch
  const { data: pitch, error: pitchRequestError } = await supabase
    .from("professional_pitch")
    .select("*")
    .eq("professional_id", professional_id)
    .eq("request_details_id", request_id)
    .maybeSingle();

  const returnData = { ...data, pitch: pitch };

  if (pitchRequestError)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });
  return NextResponse.json({ returnData });
}

//unlock a request
export async function POST(request: NextRequest) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/request/professional/restricted_request/route",
  });
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const unlockRequestData = await request.json();
  const { data, error } = await supabase.from("unlocked_request").insert({
    professional_id: unlockRequestData.professionalId,
    request_id: unlockRequestData.requestDetailsId,
  });
  if (error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });

  return NextResponse.json(unlockRequestData.requestDetailsId);
}
