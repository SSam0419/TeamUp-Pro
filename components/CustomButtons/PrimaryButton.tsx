"use client";
import React from "react";

import { Button } from "@nextui-org/react";

type props = {
  action: Function;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  tooltipText?: string;
  type?: "button" | "submit" | "reset";
};

const PrimaryButton = ({ action, text, isLoading, type, disabled }: props) => {
  return (
    <Button
      isLoading={isLoading}
      className="bg-primary w-full h-full 
      text-white 
      font-normal px-10 py-2 rounded-2xl 
      flex items-center justify-center gap-2 hover:opacity-80"
      type={`${type !== undefined ? type : "button"}`}
      disabled={disabled || (isLoading !== undefined ? isLoading : false)}
      onClick={(e) => {
        action(e);
      }}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
