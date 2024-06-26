"use client";
import CustomButton from "@/components/CustomButtons/CustomButton";
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

  const [show, setShow] = useState(false);

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
        if (data && data[0]) setSelected(data[0].title);
      },
    }
  );
  const { mutate: createMailboxMessage, isLoading: isCreatingMailboxMessage } =
    useMutation(
      ["createMailboxMessage"],
      async ({ index }: { index: number }) => {
        if (professionalIds.length === 0) {
          throw new Error("Please invite at least one professional");
        }
        const message = `You are invited to view the request details of **${origin}/professional_portal/view_request/${requestTitles?.data[index].id}** by the owner of the request`;

        const { data, status, statusText } = await axios.post(
          "/api/professional_mailbox?user_id=" + session?.user.id,
          {
            message,
            userIds: professionalIds,
          }
        );
        return { data, status, statusText };
      },
      {
        onSuccess: () => {
          toast.success("Invitation Sent Successful!");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            if (error.response)
              toast.error(error.response.statusText.toString());
          } else if (error instanceof Error) {
            toast.error(error.message.toString());
          }

          console.log(error);
        },
      }
    );

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full rounded-xl">
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
      <div className="md:w-1/2 h-full">
        <PrimaryTooltip tooltipText="Invite selected professionals to view your selected request">
          <div className="h-full w-full">
            <CustomButton
              style="bordered"
              variant="primary"
              isLoading={isCreatingMailboxMessage}
              text="Send Invitation"
              action={() => {
                createMailboxMessage({ index: selectedIdx });
              }}
            />
          </div>
        </PrimaryTooltip>
      </div>
    </div>
  );
};

export default SendRequestButton;
