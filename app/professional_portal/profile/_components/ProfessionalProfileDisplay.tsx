"use client";

import { useAppStore } from "@/libs/ZustandStore";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import ProfessionalProfileForm from "./ProfessionalProfileForm";

const ProfessionalProfileDisplay = () => {
  const { profileInfo: userProfileInfo } = useAppStore();
  const [openEditForm, setOpenEditForm] = useState(false);

  if (userProfileInfo == null) {
    return <div>Error : Null profile</div>;
  }

  return (
    <div className="text-gray-600 w-full relative">
      {!openEditForm && (
        <div
          className="absolute right-5 top-5 hover:cursor-pointer hover:bg-black p-2 hover:text-white rounded-full"
          onClick={() => setOpenEditForm(true)}
        >
          <AiFillEdit size={25} className="" />
        </div>
      )}
      {openEditForm && (
        <ProfessionalProfileForm
          profileData={userProfileInfo}
          closeForm={() => setOpenEditForm(false)}
          professional_skills={userProfileInfo.skill}
        />
      )}
      {!openEditForm && (
        <div className="max-w-3xl mx-auto">
          <div className="overflow-hidiven sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <div className="text-lg leading-6 font-medium text-gray-900">
                My Profile
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and information.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.bio}
                </div>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Lastname</dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.lastname}
                </div>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Firstname</dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.firstname}
                </div>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.email}
                </div>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.phone_number}
                </div>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Verify Status
                </dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.verify_status ? "Verified" : "Not Verified"}
                </div>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Occupation
                </dt>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfileInfo.occupation}
                </div>
              </div>
              <div className="px-4 py-5 flex flex-col gap-2 border-t border-gray-200">
                <div className="text font-medium  ">Your Skills</div>
                <div className="flex flex-wrap gap-3">
                  {userProfileInfo.skill?.map((skill, idx) => {
                    return (
                      <div
                        key={idx}
                        className="bg-secondary text-white rounded-xl px-3 py-1 text-sm"
                      >
                        #{skill}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalProfileDisplay;
