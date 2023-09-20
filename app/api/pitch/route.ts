import { PitchFormDataType } from "@/app/professional_portal/view_request/[requestDetailsId]/_components/PitchForm";
import { ConsoleLog } from "@/server-actions/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  ConsoleLog({ requestType: "POST", route: "/api/pitch/route" });

  const supabase = createServerComponentClient({ cookies });
  const { searchParams } = new URL(request.url);
  const request_id = searchParams.get("request_id");
  const professional_id = searchParams.get("professional_id");

  const pitchData: PitchFormDataType = await request.json();

  const { data, error } = await supabase.from("professional_pitch").insert({
    request_details_id: request_id,
    professional_id: professional_id,
    message: pitchData.message,
    price: pitchData.price,
    delivery_time: pitchData.deliveryTime,
    delivery_unit: pitchData.deliveryUnit,
  });

  if (error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  ConsoleLog({ requestType: "PUT", route: "/api/pitch/route" });

  const supabase = createServerComponentClient({ cookies });
  const { searchParams } = new URL(request.url);
  const request_id = searchParams.get("request_id");
  const professional_id = searchParams.get("professional_id");

  const pitchData: PitchFormDataType = await request.json();

  const { data, error } = await supabase
    .from("professional_pitch")
    .update({
      message: pitchData.message,
      price: pitchData.price,
      delivery_time: pitchData.deliveryTime,
      delivery_unit: pitchData.deliveryUnit,
    })
    .filter("professional_id", "eq", professional_id)
    .filter("request_details_id", "eq", request_id);

  if (error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "ERROR : Try Again Later",
    });
  return NextResponse.json(data);
}
