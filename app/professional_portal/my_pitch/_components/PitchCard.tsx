import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import { useRouter } from "next/navigation";
import React from "react";

type props = {
  pitch: Pitch;
};

const PitchCard = ({ pitch }: props) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-2 flex items-start">
      <div className="flex flex-col justify-center items-start">
        <p className="text-gray-600 font-medium mb-2">
          Status: {pitch.is_read ? "Read" : "Unread"}
        </p>
        <p className="text-gray-600 mb-2">
          Delivery Time: {pitch.delivery_time} {pitch.delivery_unit}
        </p>
        <p className="text-gray-600 mb-2">Price: ${pitch.price}</p>
        <p className="text-gray-600 mb-2">
          Created At: {new Date(pitch.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">
          Updated At: {new Date(pitch.updated_at).toLocaleDateString()}
        </p>
        <SecondaryButton
          text="Details"
          action={() => {
            router.push(
              `/professional_portal/view_request/${pitch.request_details_id}`
            );
          }}
        />
      </div>
      <div className="border-l mx-4 h-40"></div>
      <div className="">{pitch.message}</div>
    </div>
  );
};

export default PitchCard;
