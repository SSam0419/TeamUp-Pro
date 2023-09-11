import supabase from "@/server-actions/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const requestDetailsFromUserId = await supabase
    .from("request_details")
    .select(`* , user_profile(*), pitch(*)`)
    .eq("id", id)
    .single();

  return NextResponse.json(requestDetailsFromUserId);
}
