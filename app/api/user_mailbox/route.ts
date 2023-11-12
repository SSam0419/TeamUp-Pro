import { ConsoleLog } from "@/server-actions/utils/logger";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { userMailboxTb } from "../constant/table";

export async function PUT(request: NextRequest) {
  ConsoleLog({ requestType: "PUT", route: "/api/user_mailbox/route" });
  const supabase = createRouteHandlerClient({ cookies });
  const { id, message } = await request.json();

  const { data, error } = await supabase
    .from(userMailboxTb)
    .update(message)
    .eq("id", id);

  return NextResponse.json({ data, error });
}

export async function GET(request: NextRequest) {
  ConsoleLog({ requestType: "GET", route: "/api/user_mailbox/route" });

  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ data: null });
  }

  const { data, error } = await supabase
    .from(userMailboxTb)
    .select("*, professional_profile(*)")
    .eq("sent_to", user_id)
    .order("created_at", { ascending: false });
  if (error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  ConsoleLog({ requestType: "POST", route: "/api/user_mailbox/route" });

  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const { message } = await request.json();

  const user_id = searchParams.get("user_id");

  const { data: checkDuplicateMessage, error: checkError } = await supabase
    .from(userMailboxTb)
    .select()
    .eq("message", message)
    .eq("sent_to", user_id)
    .maybeSingle();

  if (checkDuplicateMessage !== null) {
    return new NextResponse("Error", {
      status: 400,
      statusText: "Duplicate messages",
    });
  } else if (checkError !== null) {
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });
  } else {
    const { error } = await supabase.from(userMailboxTb).insert({
      message: message,
      sent_to: user_id,
    });
    if (error)
      return new NextResponse("Error", {
        status: 400,
        statusText: "ERROR : Try Again Later",
      });
  }

  return NextResponse.json({ status: 200 });
}
