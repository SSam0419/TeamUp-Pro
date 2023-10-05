import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

type props = {
  pitchData: Pitch;
};

const PitchCard = ({ pitchData }: props) => {
  console.log(pitchData);
  const [read, setRead] = useState(pitchData.is_read);

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

  return (
    <div className="shadow border p-3 w-1/3">
      <div className="flex flex-col gap-2">
        <div className="italic">
          {`Pitch Created At: ${new Intl.DateTimeFormat("en-HK", {
            dateStyle: "full",
            timeStyle: "short",
          }).format(new Date(pitchData.created_at))}`}
        </div>
        <div>From : {pitchData.professional_profile?.lastname}</div>
        <div>Contact : {pitchData.professional_profile?.email}</div>
        <div>Price (HKD): {pitchData.price}</div>
        <div>
          Delivery : {pitchData.delivery_time} {pitchData.delivery_unit}
        </div>
        {/* <SecondaryButton text="Message Professional" action={() => {}} /> */}
      </div>
      <div className="border my-2"></div>
      {read && (
        <>
          <div>{pitchData.message}</div>
          <div className="border my-2"></div>
          <div className="w-full flex gap-3 justify-between">
            <PrimaryButton
              text="Accept"
              action={() => {
                setRead(true);
              }}
            />
            <SecondaryButton
              text="Comment"
              action={() => {
                setRead(true);
              }}
            />
          </div>
        </>
      )}
      {!read && (
        <div className="w-full">
          <PrimaryButton
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
