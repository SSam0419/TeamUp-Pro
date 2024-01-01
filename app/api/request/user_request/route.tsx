import { CreateRequestFormDataType } from "@/app/user_portal/_components/RequestForm/CreateRequestForm";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  ConsoleLog({
    requestType: "GET",
    route: "/api/request/user_request/route",
  });
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");
  const breifOnly = searchParams.get("breif_only");
  const requestId = searchParams.get("request_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const supabase = createRouteHandlerClient({ cookies });

  // const { count, error } = await supabase
  //   .from("request_details")
  //   .select("*", { count: "exact", head: true });

  let query;

  if (breifOnly) {
    query = supabase
      .from("request_details")
      .select(`title,id,content`, { count: "exact" });
  } else {
    query = supabase
      .from("request_details")
      .select(
        `* , user_profile(*), professional_pitch_view(*, professional_profile(*) )`,
        { count: "exact" }
      );
  }

  if (from && to) {
    query = query.range(parseInt(from), parseInt(to));
  }

  if (userId && requestId) {
    const requestDetailsFromUserId = await query
      .eq("id", requestId)
      .maybeSingle();

    return NextResponse.json(requestDetailsFromUserId);
  } else {
    const requestDetailsFromUserId = await query
      .order("created_at", { ascending: false })
      .eq("created_by", userId);
    console.log({ requestDetailsFromUserId, from, to });
    return NextResponse.json(requestDetailsFromUserId);
  }
}

export async function PUT(request: Request) {
  ConsoleLog({
    requestType: "PUT",
    route: "/api/request/user_request/route",
  });

  const { searchParams } = new URL(request.url);

  const requestDetails: RequestDetails = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const request_id = searchParams.get("request_id");
  const pitch_id = searchParams.get("pitch_id");

  if (pitch_id) {
    const { data, error, status, statusText } = await supabase
      .from("request_details")
      .update({
        accepted_pitch: pitch_id,
      })
      .eq("id", request_id)
      .select();

    return NextResponse.json({ data, error, status, statusText });
  }

  const { data, error, status, statusText } = await supabase
    .from("request_details")
    .update({
      title: requestDetails.title,
      content: requestDetails.content,
      duration: requestDetails.duration,
      duration_unit: requestDetails.duration_unit,
      budget_lower_limit: requestDetails.budget_lower_limit,
      budget_upper_limit: requestDetails.budget_upper_limit,
      status: requestDetails.status,
    })
    .eq("id", request_id)
    .select();

  return NextResponse.json({ data, error, status, statusText });
}

export async function POST(request: Request) {
  ConsoleLog({
    requestType: "POST",
    route: "/api/request/user_request/route",
  });
  const requestDetails: CreateRequestFormDataType = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  const data = await supabase.from("request_details").insert({
    title: requestDetails.title,
    content: requestDetails.content,
    duration: requestDetails.duration,
    budget_upper_limit: requestDetails.budget_upper_limit,
    budget_lower_limit: requestDetails.budget_lower_limit,
    industry: requestDetails.industry,
    created_by: requestDetails.createdBy,
    duration_unit: requestDetails.duration_unit,
    status: "Active",
    base_location: requestDetails.base_location,
    language_requirements: requestDetails.language_requirements,
    workmode: requestDetails.workmode,
  });
  return NextResponse.json(data);
}
