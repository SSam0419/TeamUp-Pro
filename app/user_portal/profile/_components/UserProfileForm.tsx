"use client";

import CustomButton from "@/components/CustomButtons/CustomButton";
import CustomButton from "@/components/CustomButtons/CustomButton";
import { useAppStore } from "@/libs/ZustandStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
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
  avatar_file: File | null;
  avatar_link: string;
};

type props = {
  profileData?: UserProfile;
  closeForm?: Function;
};

export default function UserProfileForm({ profileData, closeForm }: props) {
  const { session } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfileFormType>({
    id: profileData?.id || "",
    bio: profileData?.bio || "",
    username: profileData?.username || "",
    firstname: profileData?.firstname || "",
    lastname: profileData?.lastname || "",
    email: profileData?.email || "",
    phone_number: profileData?.phone_number || "",
    occupation: profileData?.occupation || "",
    avatar_file: null,
    avatar_link: profileData?.avatar_link || "",
  });
  const supabase = createClientComponentClient();

  const mutation = useMutation({
    mutationFn: async (userProfileData: UserProfileFormType) => {
      if (userProfileData.avatar_file) {
        const { data, error } = await supabase.storage
          .from("avatar")
          .upload(
            `public/user-${userProfileData.id}.jpeg`,
            userProfileData.avatar_file,
            {
              cacheControl: "0",
              upsert: true,
              contentType: "image/jpeg",
            }
          );
        const { data: link } = await supabase.storage
          .from("avatar")
          .getPublicUrl(`public/user-${userProfileData.id}.jpeg`);

        userProfileData.avatar_link = link.publicUrl;
      }

      return await axios.post("/api/profile/user", userProfileData);
    },
    onSuccess: ({ data, status }) => {
      if (status >= 200 && status <= 300) {
        toast.success("Update Successful, wait a while to see changes");
        queryClient.invalidateQueries({
          queryKey: ["retrieveUserProfile"],
        });
        if (closeForm) closeForm();
        else router.refresh();
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
    <form
      className="w-[300px] md:w-full md:max-w-md mx-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="mb-4 flex flex-col justify-center items-start gap-3">
        <div className="border w-[250px] h-[250px] relative">
          <Image
            loader={({ src }) => src}
            src={
              userProfile.avatar_link !== null ? userProfile.avatar_link : ""
            }
            alt="Avatar"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="shadow border p-2 rounded-xl relative">
          <p className="absolute top-1/2 -translate-y-1/2 flex items-center gap-3">
            <AiOutlineCloudUpload />
            Upload Photo
          </p>
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="w-full opacity-0 placeholder:upload your avatar"
            onChange={async (e) => {
              if (!e.target.files) {
                return;
              }
              const file = e.target.files[0];
              if (
                file &&
                (file.type === "image/jpeg" || file.type === "image/png")
              ) {
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  avatar_file: file,
                  avatar_link: URL.createObjectURL(file),
                }));
              } else {
                toast.error("Please select a JPEG or PNG image.");
              }
            }}
          ></input>
        </div>
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
        <CustomButton
          variant="primary"
          isLoading={mutation.isLoading}
          type="submit"
          text={profileData ? "Update Profile" : "Create Profile"}
          action={() => {}}
        />

        {profileData && closeForm && (
          <CustomButton
            variant="secondary"
            isLoading={mutation.isLoading}
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
