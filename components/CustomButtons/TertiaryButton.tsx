"use client";
import { Button } from "@nextui-org/react";
import React, { ReactElement, ReactNode } from "react";

type props = {
  action: Function;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactElement;
};

const TertiaryButton = ({
  action,
  text,
  isLoading,
  type,
  disabled,
  icon,
}: props) => {
  return (
    <Button
      className="bg-white border border-secondary w-full
      text-black h-[40px]  font-normal px-10 py-2 rounded-lg
        flex items-center justify-center gap-2 hover:opacity-80"
      type={`${type !== undefined ? type : "button"}`}
      isLoading={isLoading}
      disabled={disabled || (isLoading !== undefined ? isLoading : false)}
      onClick={(e) => action(e)}
    >
      {icon !== null ? (
        <div className="flex items-center justify-center gap-2">
          {icon} {text}
        </div>
      ) : (
        text
      )}
    </Button>
  );
};

export default TertiaryButton;
