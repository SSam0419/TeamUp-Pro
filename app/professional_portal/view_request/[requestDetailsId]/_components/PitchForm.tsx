import SecondaryButton from "@/components/SecondaryButton";
import { useAppStore } from "@/libs/ZustandStore";
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
      } else {
        data = await axios.put(
          `/api/pitch?request_id=${params.requestDetailsId}&professional_id=${profileInfo?.id}`,
          pitchFormData
        );
      }
      console.log(data);
      return data;
    },
    {
      onSuccess: () => {
        if (requestDetails.pitch == null) {
          toast("Pitch Created!");
        } else {
          toast("Pitch Edited!");
        }
        queryClient.invalidateQueries({ queryKey: ["fetchUnlockedRequest"] });
      },
    }
  );

  const [pitchFormData, setPitchFormData] = useState<PitchFormDataType>({
    message: requestDetails.pitch?.message || "",
    price: requestDetails.pitch?.price | requestDetails.budget,
    deliveryTime: requestDetails.duration,
    deliveryUnit: "Days",
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
      <div className="flex items-center justify-between w-full">
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
        <div>
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

      <SecondaryButton
        isLoading={isLoading}
        text={requestDetails.pitch !== null ? "Edit Pitch" : "Create Pitch"}
        type="submit"
        action={() => {}}
      />
    </form>
  );
};

export default PitchForm;
