"use client";

import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";

export type UserProfileFormType = {
  id: string;
  bio: string;
  username: string;
  email: string;
  phone_number: string;
  occupation: string;
};

export default function UserProfileForm() {
  const { session } = useAppStore();

  const [userProfile, setUserProfile] = useState<UserProfileFormType>({
    id: "",
    bio: "",
    username: "",
    email: "",
    phone_number: "",
    occupation: "",
  });

  const mutation = useMutation({
    mutationFn: async (userProfileData: UserProfileFormType) => {
      return await axios.post("/api/profile/user", userProfileData);
    },
    onSuccess: ({ data, status }) => {
      console.log("onSuccess: ", data);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session == null) return;
    userProfile.id = session.user.id;
    mutation.mutate(userProfile);
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={(e) => handleSubmit(e)}>
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
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary focus:outline-none focus:bg-primary"
      >
        Create Profile
      </button>
    </form>
  );
}
