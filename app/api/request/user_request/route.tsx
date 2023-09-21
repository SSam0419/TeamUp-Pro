import { CreateRequestFormDataType } from "@/app/user_portal/_components/CreateRequestForm";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/user_request/route",
  });
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const request_id = searchParams.get("request_id");
  const supabase = createServerComponentClient({ cookies });

  if (user_id && request_id) {
    const requestDetailsFromUserId = await supabase
      .from("request_details")
      .select(`* , user_profile(*), professional_pitch(*)`)
      .eq("id", request_id)
      .maybeSingle();

    return NextResponse.json(requestDetailsFromUserId);
  } else {
    const requestDetailsFromUserId = await supabase
      .from("request_details")
      .select(`* , user_profile(*), professional_pitch(*)`)
      .order("created_at", { ascending: false })
      .eq("created_by", user_id);

    console.log(requestDetailsFromUserId);
    return NextResponse.json(requestDetailsFromUserId);
  }
}

export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/request/user_request/route",
  });
  const requestDetails: CreateRequestFormDataType = await request.json();
  const supabase = createServerComponentClient({ cookies });
  const data = await supabase.from("request_details").insert({
    title: requestDetails.title,
    content: requestDetails.content,
    duration: requestDetails.duration,
    budget: requestDetails.budget,
    industry: requestDetails.industry,
    createdBy: requestDetails.createdBy,
    disclose_contact: requestDetails.disclose_contact,
    status: "Active",
  });
  return NextResponse.json(data);
}
