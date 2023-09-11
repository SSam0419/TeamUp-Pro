import { CreateRequestFormDataType } from "@/app/user_portal/_components/CreateRequestForm";
import supabase from "@/server-actions/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const requestDetailsFromUserId = await supabase
    .from("request_details")
    .select(`* , user_profile(*), pitch(*)`)
    .order("createdAt", { ascending: false })
    .eq("createdBy", id);

  return NextResponse.json(requestDetailsFromUserId);
}

export async function POST(request: Request) {
  const requestDetails: CreateRequestFormDataType = await request.json();
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
