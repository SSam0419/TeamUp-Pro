import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//get a unlocked request
export async function GET(request: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id == null)
    return new NextResponse("Error", {
      status: 404,
      statusText: "ERROR : Missing Request Id",
    });

  const { data, error } = await supabase
    .from("request_details")
    .select()
    .eq("id", id)
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
  return NextResponse.json({ data });
}

//unlock a request
export async function POST(request: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
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
