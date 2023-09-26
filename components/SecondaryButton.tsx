"use client";
import React from "react";
import { MoonLoader } from "react-spinners";

type props = {
  action: Function;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const SecondaryButton = ({
  action,
  text,
  isLoading,
  type,
  disabled,
}: props) => {
  return (
    <button
      className={`bg-secondary w-full
      text-white h-[40px] 
        font-medium px-10 py-2 rounded hover:opacity-70
        flex items-center justify-center gap-2
        ${
          isLoading || disabled
            ? "opacity-70"
            : "active:bg-white active:border-black active:text-black active:border"
        }`}
      type={`${type !== undefined ? type : "button"}`}
      disabled={disabled || (isLoading !== undefined ? isLoading : false)}
      onClick={(e) => action(e)}
    >
      {isLoading && (
        <MoonLoader size={15} color="white" />
        // <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
      )}
      {!isLoading && text}
    </button>
  );
};

export default SecondaryButton;
