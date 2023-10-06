"use client";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const { session } = useAppStore();

  const { data: messsages } = useQuery(
    ["fetechMailboxMessages", session],
    async () => {
      if (!session) {
        return null;
      }
      const { data } = await axios.get(
        "/api/mailbox?professional_id=" + session.user.id
      );
      return data as Mailbox[];
    }
  );

  return (
    <div className="flex flex-wrap gap-4">
      {messsages &&
        messsages.map((message, idx) => {
          return (
            <div key={idx}>
              <MessageCard message={message} />
            </div>
          );
        })}
    </div>
  );
};

export default MessageList;
