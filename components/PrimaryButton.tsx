"use client";
import React from "react";

type props = {
  action: Function;
  text: string;
};

const PrimaryButton = ({ action, text }: props) => {
  return (
    <button
      className="bg-primary 
      text-white h-[40px] 
        font-medium px-10 py-2 rounded-[45px] "
      onClick={(e) => action(e)}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
