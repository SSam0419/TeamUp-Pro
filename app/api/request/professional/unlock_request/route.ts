import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
  const unlockRequestData = await request.json();
  const requestDetails = await supabase.from("unlocked_reqeust").insert({
    professional_id: unlockRequestData.professionalId,
    request_id: unlockRequestData.requestId,
  });

  return NextResponse.json(requestDetails);
}
