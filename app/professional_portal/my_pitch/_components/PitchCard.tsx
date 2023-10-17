import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiExternalLink } from "react-icons/fi";

type props = {
  pitch: Pitch;
};

const PitchCard = ({ pitch }: props) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-2 flex flex-col w-[300px] md:w-[600px] md:flex-row md:items-start ">
      <div className="flex flex-col justify-center items-start w-full md:w-1/2">
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
        <div className=" text-primary flex justify-center items-center ">
          <Link
            href={`/professional_portal/view_request/${pitch.request_details_id}`}
            className="flex justify-center items-center gap-2 "
          >
            <FiExternalLink size={20} />
            <h1>Details</h1>
          </Link>
        </div>
      </div>
      <Divider className="my-3 md:hidden" />
      <div className="hidden md:block border-l mx-4 h-40"></div>
      <div className="w-full md:w-1/2 text-left line-clamp-6 overflow-hidden">
        {pitch.message.toString()}
      </div>
    </div>
  );
};

export default PitchCard;
