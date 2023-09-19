"use client";
import React from "react";
import Spinner from "./Spinner";
import { MoonLoader } from "react-spinners";

type props = {
  action: Function;
  text: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
};

const PrimaryButton = ({ action, text, isLoading, type }: props) => {
  return (
    <button
      className={`bg-secondary
      text-white h-[40px] 
        font-medium px-10 py-2 rounded-[45px] hover:opacity-70
        flex items-center justify-center gap-2
        ${
          isLoading
            ? "opacity-70"
            : "active:bg-white active:border-black active:text-black active:border"
        }`}
      type={`${type !== undefined ? type : "button"}`}
      disabled={isLoading !== undefined ? isLoading : false}
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

export default PrimaryButton;
