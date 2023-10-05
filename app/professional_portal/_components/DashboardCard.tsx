"use client";

import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import TertiaryButton from "@/components/CustomButtons/TertiaryButton";
import StatusChip from "@/components/StatusChip";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { AiFillLock, AiOutlineRead } from "react-icons/ai";

const DashboardCard = ({
  requestDetails,
}: {
  requestDetails: RequestDetails;
}) => {
  return (
    <Card className="min-w-[340px]">
      <CardHeader className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          {requestDetails.title}

          <StatusChip status={requestDetails.status} />
        </div>
        <div className="text-small text-default-500 w-full">
          {requestDetails.duration} {requestDetails.duration_unit}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="">
        <div className="">
          <div className="">
            {requestDetails.content}
            <p className="italic">unlock to view more...</p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full">
          {requestDetails.unlocked ? (
            <TertiaryButton
              icon={<AiOutlineRead size={20} />}
              text="View"
              action={() => {}}
            />
          ) : (
            <SecondaryButton
              text="Unlock"
              action={() => {}}
              icon={<AiFillLock size={20} />}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
