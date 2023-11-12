"use client";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import MessageCard from "./MessageCard";
import UnauthorizedPage from "@/components/UnauthorizedPage";

const MessageList = () => {
  const { session } = useAppStore();

  const { data: messsages } = useQuery(
    ["fetechMailboxMessages", session],
    async () => {
      if (!session) {
        return null;
      }
      const { data } = await axios.get(
        "/api/user_mailbox?user_id=" + session.user.id
      );
      return data as Mailbox[];
    }
  );

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {!session && <UnauthorizedPage />}
      {messsages &&
        messsages.map((message, idx) => {
          return (
            <div key={idx}>
              <MessageCard message={message} />
            </div>
          );
        })}
      {messsages?.length === 0 && <div>No messages yet.</div>}
    </div>
  );
};

export default MessageList;
