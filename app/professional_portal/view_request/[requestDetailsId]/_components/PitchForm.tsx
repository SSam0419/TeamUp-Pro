import CustomButton from "@/components/CustomButtons/CustomButton";
import { notifyUserPitchMessage } from "@/components/MessageMarkdown";
import { useAppStore } from "@/libs/ZustandStore";
import { RequestDetails } from "@/libs/models/RequestDetails";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export type PitchFormDataType = {
  message: string;
  price: number;
  deliveryTime: string;
  deliveryUnit: "Days" | "Weeks" | "Months";
};

const PitchForm = ({
  params,
  requestDetails,
}: {
  params: { requestDetailsId: string };
  requestDetails: RequestDetails;
}) => {
  const { profileInfo } = useAppStore();

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    ["postPitch"],
    async (pitchFormData: PitchFormDataType) => {
      let data;
      if (requestDetails.pitch == null) {
        data = await axios.post(
          `/api/pitch?request_id=${params.requestDetailsId}&professional_id=${profileInfo?.id}`,
          pitchFormData
        );

        const mailboxRes = await axios.post(
          `/api/user_mailbox?user_id=${requestDetails.user_profile?.id}`,
          {
            message: notifyUserPitchMessage({
              title: requestDetails.title,
              url: `www.teamup-pro.com/user_portal/request_details/${params.requestDetailsId}`,
            }),
          }
        );
      } else {
        data = await axios.put(
          `/api/pitch?request_id=${params.requestDetailsId}&professional_id=${profileInfo?.id}`,
          pitchFormData
        );
      }
      return data;
    },
    {
      onSuccess: () => {
        if (requestDetails.pitch == null) {
          toast.success("Pitch Created!");
        } else {
          toast.success("Pitch Edited!");
        }
        queryClient.invalidateQueries({
          queryKey: ["retrieveUnlockedRequest"],
        });
      },
    }
  );

  const [pitchFormData, setPitchFormData] = useState<PitchFormDataType>({
    message: requestDetails.pitch?.message || "",
    price: requestDetails.pitch?.price || requestDetails.budget_lower_limit,
    deliveryTime:
      requestDetails.pitch?.delivery_time.toString() ||
      requestDetails?.duration,
    deliveryUnit: requestDetails.pitch?.delivery_unit || "Days",
  });

  const handleFormDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldValue = value;
    setPitchFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };
  return (
    <form
      className="flex p-5 flex-col gap-3 shadow w-full border rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        mutate(pitchFormData);
      }}
    >
      <div className="italic">
        {requestDetails.pitch &&
          `Last Update: ${new Intl.DateTimeFormat("en-HK", {
            dateStyle: "full",
            timeStyle: "long",
          }).format(new Date(requestDetails.pitch.updated_at))}`}
      </div>
      <div className="flex md:items-center justify-between w-full  flex-col gap-3 md:gap-0 md:flex-row ">
        <div>
          <label
            htmlFor="price"
            className="block mb-2 font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={pitchFormData.price}
            onChange={handleFormDataChange}
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="">
          <label
            htmlFor="deliveryTime"
            className="block mb-2 font-medium text-gray-700"
          >
            Delivery
          </label>
          <div className="flex gap-1">
            <input
              id="deliveryTime"
              name="deliveryTime"
              type="number"
              value={pitchFormData.deliveryTime}
              onChange={handleFormDataChange}
              className="px-4 py-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className="p-1"
              name="deliveryUnit"
              value={pitchFormData.deliveryUnit}
              onChange={handleFormDataChange}
            >
              <option>Days</option>
              <option>Weeks</option>
              <option>Months</option>
            </select>
          </div>
        </div>
      </div>
      <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
        Message
      </label>
      <textarea
        rows={10}
        placeholder="Introduction, Relevant Experience, Pricing / Packages ..."
        id="message"
        name="message"
        value={pitchFormData.message}
        onChange={handleFormDataChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <CustomButton
        variant="secondary"
        isLoading={isLoading}
        text={requestDetails.pitch !== null ? "Edit Pitch" : "Create Pitch"}
        type="submit"
        action={() => {}}
      />
    </form>
  );
};

export default PitchForm;
