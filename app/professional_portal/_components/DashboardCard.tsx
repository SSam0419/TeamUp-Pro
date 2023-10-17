"use client";

import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import StatusChip from "@/components/StatusChip";
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
    <Card className="w-[300px] md:w-[500px]">
      <CardHeader className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <div className="w-3/4 max-h-20 truncate overflow-hidden">
            {requestDetails.title}
          </div>

          <StatusChip status={requestDetails.status} />
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
        <div className="">{requestDetails.content}</div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full">
          <SecondaryButton
            isLoading={redirecting}
            text="Read More"
            action={() => {
              setRedirecting(true);
              router.push(
                "/professional_portal/view_request/" + requestDetails.id
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
