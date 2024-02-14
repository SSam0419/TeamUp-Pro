"use client";

import { useAppStore } from "@/libs/ZustandStore";
import React, { useEffect, useState } from "react";
import UserProfileForm from "./_components/UserProfileForm";
import Spinner from "@/components/Spinner";

const Page = () => {
  const { loadingState, session } = useAppStore();

  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    if (session !== null) {
      setValidSession(true);
    }
  }, [session]);

  if (!validSession) {
    return (
      <div className="bg-white rounded-xl flex flex-col gap-10 justify-center items-center w-[550px] min-h-[550px] p-5"></div>
    );
  }

  return (
    <div className="bg-white rounded-xl flex flex-col gap-10 justify-center items-center w-[550px] min-h-[550px] p-5">
      {loadingState ? (
        <Spinner />
      ) : (
        <div className="w-[550px] flex flex-col gap-4 items-center justify-center">
          <div className="w-full">{<UserProfileForm />}</div>
        </div>
      )}
    </div>
  );
};

export default Page;
