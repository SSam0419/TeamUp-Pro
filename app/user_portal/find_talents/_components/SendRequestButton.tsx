"use client";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import PrimaryTooltip from "@/components/PrimaryTooltip";
import { useAppStore } from "@/libs/ZustandStore";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

const SendRequestButton = ({
  professionalIds,
}: {
  professionalIds: string[];
}) => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const { session } = useAppStore();
  const [selected, setSelected] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { data: requestTitles, isLoading } = useQuery(
    ["retrieveRequestTitles"],
    async () => {
      if (session == null) {
        return { data: [] };
      }
      const { data } = await axios.get(
        "/api/request/user_request?user_id=" +
          session.user.id +
          "&breif_only=true"
      );
      return {
        data: data.data as { title: string; content: string; id: string }[],
      };
    },
    {
      onSuccess: ({ data }) => {
        if (data) setSelected(data[0].title);
      },
    }
  );
  const { mutate: createMailboxMessage, isLoading: isCreatingMailboxMessage } =
    useMutation(
      ["createMailboxMessage"],
      async ({ index }: { index: number }) => {
        if (index == 0) {
          toast("Please select a valid request");
          return { data: null, error: "select a valid request" };
        }

        const message = `You are invited to view the request details of ${origin}/professional_portal/view_request/${requestTitles?.data[index].id} by the owner of the request`;

        const { data, status, statusText } = await axios.post(
          "/api/mailbox?user_id=" + session?.user.id,
          {
            message,
            professionalIds,
          }
        );
        return { data, status, statusText };
      },
      {
        onSuccess: () => {
          toast("Invitation Sent Successful!");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error.response) toast(error.response.statusText.toString());
          }

          console.log(error);
        },
      }
    );
  return (
    <div className="flex w-full shadow rounded-lg">
      <div className="bg-white flex justify-center items-center p-3 gap-5 w-full rounded-xl">
        {requestTitles?.data && (
          <Select
            value={selected}
            color="default"
            isLoading={isLoading}
            label="select request"
            placeholder="Select a request"
            onChange={(e) => setSelected(e.target.value)}
          >
            {requestTitles.data.map((title, idx) => {
              return (
                <SelectItem
                  key={idx}
                  value={title.title}
                  onClick={() => {
                    setSelectedIdx(idx);
                  }}
                >
                  {title.title.toString()}
                </SelectItem>
              );
            })}
          </Select>
        )}
        <div className="w-1/2 h-full">
          <PrimaryTooltip tooltipText="Invite selected professionals to view your selected request">
            <div className="h-full w-full">
              <PrimaryButton
                isLoading={isCreatingMailboxMessage}
                text="Send Request"
                action={() => {
                  createMailboxMessage({ index: selectedIdx });
                }}
              />
            </div>
          </PrimaryTooltip>
        </div>
      </div>
    </div>
  );
};

export default SendRequestButton;
