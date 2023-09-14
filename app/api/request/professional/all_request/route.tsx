import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  const requestDetails = await supabase.from("request_free_view").select(` * `);

  return NextResponse.json(requestDetails);
}
