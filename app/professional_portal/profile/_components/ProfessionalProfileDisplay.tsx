"use client";

import { useAppStore } from "@/libs/ZustandStore";
import React from "react";

const ProfessionalProfileDisplay = () => {
  const { profileInfo: userProfileInfo } = useAppStore();
  if (userProfileInfo == null) {
    return <div>Error : Null profile</div>;
  }
  return (
    <div className="text-gray-600 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="overflow-hidiven sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="text-lg leading-6 font-medium text-gray-900">
              My Profile
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and information.
            </p>
            <div className="px-4 py-5 ">ID: {userProfileInfo.id}</div>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfileInfo.bio}
              </div>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfileInfo.username}
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
              <dt className="text-sm font-medium text-gray-500">Occupation</dt>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfileInfo.occupation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileDisplay;
