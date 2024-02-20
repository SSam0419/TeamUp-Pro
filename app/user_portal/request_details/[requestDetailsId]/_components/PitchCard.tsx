import CustomButton from "@/components/CustomButtons/CustomButton";
import { Pitch } from "@/libs/models/Pitch";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

type props = {
  pitchData: Pitch;
  requestId: string;
};

const PitchCard = ({ pitchData, requestId }: props) => {
  const [read, setRead] = useState(pitchData.is_read);
  const [accepted, setAccepted] = useState(pitchData.is_accepted || false);

  const { mutate: updatePitchReadStatus, isLoading } = useMutation(
    ["updatePitchReadStatus"],
    async ({ pitchId }: { pitchId: string }) => {
      const { data, status, statusText } = await axios.put(
        `/api/pitch?pitch_id=${pitchId}&is_read=true`
      );
      console.log({ data, status, statusText });
      return { data, status, statusText };
    }
  );
  const {
    mutate: updatePitchAcceptStatus,
    isLoading: isUpdatingPitchAcceptStatus,
  } = useMutation(
    ["updatePitchReadStatus"],
    async ({ pitchId }: { pitchId: string }) => {
      const { data, status, statusText } = await axios.put(
        `/api/pitch?pitch_id=${pitchId}&is_accepted=true&request_id=${requestId}&professional_id=${pitchData.professional_profile.id}`
      );
      console.log({ data, status, statusText });
      return { data, status, statusText };
    },
    {
      onSuccess: () => {
        toast.success(
          "Congrats! You have accepted a pitch from the professional! \n We will notify the professional shortly!"
        );
        setAccepted(true);
      },
    }
  );

  return (
    <div className="shadow border p-3 md:w-1/3">
      <div className="flex flex-col gap-2">
        <div className="italic">
          {`Pitch Created At: ${new Intl.DateTimeFormat("en-HK", {
            dateStyle: "full",
            timeStyle: "short",
          }).format(new Date(pitchData.created_at))}`}
        </div>
        <div>From : {pitchData.professional_profile?.lastname}</div>
        <div>Contact : {pitchData.professional_profile?.email}</div>
        <div>Price (USD): {pitchData.price}</div>
        <div>
          Delivery : {pitchData.delivery_time} {pitchData.delivery_unit}
        </div>
        {/* <CustomButton variant="secondary" text="Message Professional" action={() => {}} /> */}
      </div>
      <div className="border my-2"></div>
      {read && (
        <>
          <div>{pitchData.message}</div>
          <div className="border my-2"></div>
          <div className="w-full flex gap-3 justify-between">
            <CustomButton
              variant="primary"
              disabled={accepted}
              isLoading={isUpdatingPitchAcceptStatus}
              text={accepted ? "You have accepted" : "Accept"}
              action={() => {
                updatePitchAcceptStatus({ pitchId: pitchData.id });
              }}
            />
          </div>
        </>
      )}
      {!read && (
        <div className="w-full">
          <CustomButton
            variant="primary"
            isLoading={isLoading}
            text="Read Message"
            action={() => {
              setRead(true);
              updatePitchReadStatus({ pitchId: pitchData.id });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PitchCard;
