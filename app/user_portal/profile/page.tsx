"use client";

import { useAppStore } from "@/libs/ZustandStore";
import React, { useEffect, useState } from "react";
import UserProfileForm from "./_components/UserProfileForm";
import Spinner from "@/components/Spinner";
import { Tab, Tabs } from "@nextui-org/react";
import CustomButton from "@/components/CustomButtons/CustomButton";
import ProfessionalProfileForm from "./_components/ProfessionalProfileForm";

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
    <div className="bg-white rounded-xl flex flex-col gap-10 justify-start items-center w-[550px] min-h-[550px] p-5">
      {loadingState ? (
        <Spinner />
      ) : (
        <div className="w-[550px] flex flex-col p-3 h-full">
          <Tabs className="p-3">
            <Tab key="General" title="General">
              <div className="w-full">{<UserProfileForm />}</div>
            </Tab>
            <Tab key="Professional" title="Professional">
              <div className="h-full  p-3 ">
                <ProfessionalProfileForm />
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Page;
