import { Database } from "@/libs/types/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const isProfessional = searchParams.get("professional");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (isProfessional == null) {
    return NextResponse.redirect(new URL("/user_portal", req.url));
  } else {
    return NextResponse.redirect(new URL("/professional_portal", req.url));
  }
}
