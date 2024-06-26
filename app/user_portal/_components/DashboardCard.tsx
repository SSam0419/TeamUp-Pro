"use client";

import CustomButton from "@/components/CustomButtons/CustomButton";
import StatusChip from "@/components/StatusChip";
import { RequestDetails } from "@/libs/models/RequestDetails";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdReadMore } from "react-icons/md";

const DashboardCard = ({
  requestDetails,
}: {
  requestDetails: RequestDetails;
}) => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  return (
    <Card className="w-[300px] md:w-full h-[380px]">
      <CardHeader className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="w-3/4 max-h-20 truncate overflow-hidden">
            {requestDetails.title}
          </div>

          <StatusChip status={requestDetails.status} />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="w-3/4 max-h-20 truncate overflow-hidden">
            Current Pitch : {requestDetails.professional_pitch_view.length}
          </div>
        </div>
        <div className="text-small text-default-500 w-full">
          {requestDetails.duration} {requestDetails.duration_unit}
        </div>
        <div className="text-small text-default-500 w-full">
          ${requestDetails.budget_lower_limit}-
          {requestDetails.budget_upper_limit}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="">
        <div className="line-clamp-6">{requestDetails.content}</div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full">
          <CustomButton
            variant="secondary"
            isLoading={redirecting}
            text="Read More"
            action={async () => {
              setRedirecting(true);
              await router.push(
                `/user_portal/request_details/${requestDetails.id}`
              );
            }}
            icon={<MdReadMore size={20} />}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
