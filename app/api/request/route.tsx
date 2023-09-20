import { CreateRequestFormDataType } from "@/app/user_portal/_components/CreateRequestForm";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/route",
  });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const supabase = createServerComponentClient({ cookies });
  try {
    const requestDetailsFromUserId = await supabase
      .from("request_details")
      .select(`* , user_profile(*), professional_pitch(*)`)
      .order("created_at", { ascending: false })
      .eq("created_by", id);
    return NextResponse.json(requestDetailsFromUserId);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/request/single_request_details/route",
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
