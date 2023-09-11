import supabase from "@/server-actions/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await supabase.from("user_profile").select().eq("id", id);

  return NextResponse.json(data);
}
