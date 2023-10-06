import { ConsoleLog } from "@/server-actions/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  ConsoleLog({ requestType: "PUT", route: "/api/mailbox/route" });
  const supabase = createServerComponentClient({ cookies });
  const { id, message } = await request.json();

  const { data, error } = await supabase
    .from("mailbox")
    .update(message)
    .eq("id", id);

  return NextResponse.json({ data, error });
}

export async function GET(request: NextRequest) {
  ConsoleLog({ requestType: "GET", route: "/api/mailbox/route" });

  const supabase = createServerComponentClient({ cookies });
  const { searchParams } = new URL(request.url);
  const professional_id = searchParams.get("professional_id");

  if (!professional_id) {
    return NextResponse.json({ data: null });
  }

  const { data, error } = await supabase
    .from("mailbox")
    .select("*, user_profile(*)")
    .eq("sent_to", professional_id)
    .order("created_at", { ascending: false });

  if (error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  ConsoleLog({ requestType: "POST", route: "/api/mailbox/route" });

  const supabase = createServerComponentClient({ cookies });
  const { searchParams } = new URL(request.url);
  const { message, professionalIds } = await request.json();

  const professional_id = searchParams.get("professional_id");
  const user_id = searchParams.get("user_id");
  let duplicateMessage = [];
  for (const id of professionalIds) {
    const { data: check, error: checkError } = await supabase
      .from("mailbox")
      .select()
      .eq("message", message)
      .eq("sent_to", id)
      .maybeSingle();
    if (check !== null) {
      duplicateMessage.push(id);
    } else {
      const { data, error } = await supabase.from("mailbox").insert({
        message: message,
        sent_to: id,
        sent_from: user_id,
      });
      if (error)
        return new NextResponse("Error", {
          status: 400,
          statusText: "ERROR : Try Again Later",
        });
    }
  }
  if (duplicateMessage.length !== 0) {
    return new NextResponse("Error", {
      status: 400,
      statusText: "You have already sent to some Professionals",
    });
  }
  return NextResponse.json({ status: 200 });
}