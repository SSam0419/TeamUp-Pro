import PrimaryTooltip from "@/components/PrimaryTooltip";
import {
  Card,
  Divider,
  CardBody,
  CardFooter,
  Checkbox,
} from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import Markdown from "react-markdown";

const MessageCard = ({ message }: { message: Mailbox }) => {
  const [isRead, setIsRead] = useState(message.is_read);
  const { mutate: updateMailboxIsRead } = useMutation(
    ["updateMailboxIsRead"],
    async () => {
      setIsRead(true);
      message.is_read = true;
      const { data } = await axios.put("/api/user_mailbox", {
        id: message.id,
        message: {
          is_read: true,
        },
      });
      console.log(data);
      return { data };
    }
  );

  return (
    <div className="relative">
      {!message.is_read && (
        <div className="flex h-3 w-3 absolute top-0 left-0 z-50">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </div>
      )}
      <Card className="max-w-[400px] h-[200px] relative">
        <Divider />
        <CardBody className="overflow-y-scroll">
          <Markdown>{message.message}</Markdown>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-md">
              From: {message.user_profile.lastname}{" "}
              {message.user_profile.firstname}
            </p>
            <p className="text-small text-default-500">
              {message.user_profile.occupation}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <PrimaryTooltip tooltipText="mark as read">
              <div className="" onClick={() => updateMailboxIsRead()}>
                {!isRead ? (
                  <Checkbox
                    onClick={() => updateMailboxIsRead()}
                    size="lg"
                    checked={isRead}
                    key={"1"}
                  ></Checkbox>
                ) : (
                  <Checkbox
                    size="lg"
                    defaultSelected
                    key={"2"}
                    isReadOnly
                  ></Checkbox>
                )}
              </div>
            </PrimaryTooltip>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default MessageCard;
