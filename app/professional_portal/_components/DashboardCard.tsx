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
import { CiLocationOn } from "react-icons/ci";
import { GrLanguage } from "react-icons/gr";
import { MdAirplanemodeActive } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { FaNetworkWired } from "react-icons/fa";

const DashboardCard = ({
  requestDetails,
}: {
  requestDetails: RequestDetails;
}) => {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  return (
    <div
      className="flex flex-col gap-2 border rounded-lg px-5 py-3 my-3 hover:cursor-pointer hover:bg-slate-200"
      onClick={() => {
        setShowContent((prev) => !prev);
      }}
    >
      <div className="flex items-center gap-4 bg-">
        <div className="flex items-center gap-2">
          <CiLocationOn /> {requestDetails.base_location || "UNAVAILABLE"}
        </div>
        <div className="flex items-center gap-2">
          {(() => {
            switch (requestDetails.workmode) {
              case "Remote Only":
                return <MdAirplanemodeActive />;
              case "On Site Only":
                return <FaHouse />;
              case "Hybrid":
                return <FaNetworkWired />;
              default:
                return null;
            }
          })()}
          {requestDetails.workmode}
        </div>
        <div className="flex items-center gap-2">
          <GrLanguage />
          {requestDetails.language_requirements?.map((language, idx) => (
            <div key={language}>
              {idx !== requestDetails.language_requirements.length - 1
                ? `${language},`
                : language}
            </div>
          )) || "UNAVAILABLE"}
        </div>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-7 gap-5 w-full text-sm text-gray-400">
          <div className="col-span-3">Title</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Budget(HKD)</div>
          <div className="col-span-1">Duration</div>
        </div>
        <div className="grid grid-cols-7 gap-5 w-full text-base">
          <div className="col-span-3 line-clamp-1">{requestDetails.title}</div>
          <div className="col-span-1">
            <StatusChip status={requestDetails.status} />
          </div>
          <div className="col-span-2">
            ${requestDetails.budget_lower_limit} - $
            {requestDetails.budget_upper_limit}
          </div>
          <div className="col-span-1">
            {requestDetails.duration} {requestDetails.duration_unit}
          </div>
        </div>
      </div>
      {showContent && (
        <>
          <Divider />
          <div>{requestDetails.content}</div>

          <div className="w-full">
            <SecondaryButton
              isLoading={redirecting}
              text="Pitch Now"
              action={() => {
                setRedirecting(true);
                router.push(
                  "/professional_portal/view_request/" + requestDetails.id
                );
              }}
              icon={<MdReadMore size={20} />}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <Card className="flex flex-row md:w-full h-[380px] ">
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
        <div className="line-clamp-6">{requestDetails.content}</div>
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
