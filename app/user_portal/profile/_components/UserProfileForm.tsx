"use client";

import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export type UserProfileFormType = {
  id: string;
  bio: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  occupation: string;
};

type props = {
  profileData?: UserProfile;
  closeForm?: Function;
};

export default function UserProfileForm({ profileData, closeForm }: props) {
  const { session } = useAppStore();
  const queryClient = useQueryClient();
  const [userProfile, setUserProfile] = useState<UserProfileFormType>({
    id: profileData?.id || "",
    bio: profileData?.bio || "",
    username: profileData?.username || "",
    firstname: profileData?.firstname || "",
    lastname: profileData?.lastname || "",
    email: profileData?.email || "",
    phone_number: profileData?.phone_number || "",
    occupation: profileData?.occupation || "",
  });

  const mutation = useMutation({
    mutationFn: async (userProfileData: UserProfileFormType) => {
      return await axios.post("/api/profile/user", userProfileData);
    },
    onSuccess: ({ data, status }) => {
      if (status >= 200 && status <= 300) {
        if (closeForm) closeForm();
        toast("Update Successful, wait a while to see changes");
        queryClient.invalidateQueries({
          queryKey: ["retrieveUserProfile"],
        });
      }
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldValue = value;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session == null) return;

    userProfile.id = session.user.id;
    await mutation.mutate(userProfile);
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block mb-2 font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={userProfile.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastname"
          className="block mb-2 font-medium text-gray-700"
        >
          Lastname
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={userProfile.lastname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="firstname"
          className="block mb-2 font-medium text-gray-700"
        >
          Firstname
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={userProfile.firstname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bio" className="block mb-2 font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={userProfile.bio}
          onChange={(e) => handleChange(e)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userProfile.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone_number"
          className="block mb-2 font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          pattern="[0-9]{8}"
          type="tel"
          id="phone_number"
          name="phone_number"
          value={userProfile.phone_number}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="occupation"
          className="block mb-2 font-medium text-gray-700"
        >
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={userProfile.occupation}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <PrimaryButton
          type="submit"
          text={profileData ? "Update Profile" : "Create Profile"}
          action={() => {}}
        />

        {profileData && closeForm && (
          <SecondaryButton
            type="button"
            text="Cancel"
            action={() => {
              closeForm();
            }}
          />
        )}
      </div>
    </form>
  );
}
