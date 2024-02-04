"use client";

import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import PrimaryButton from "@/components/CustomButtons/PrimaryButton";
import SecondaryButton from "@/components/CustomButtons/SecondaryButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useConstantStore } from "@/libs/slices/constantSlice";

export type ProfessionalProfileFormType = {
  id: string;
  bio: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  occupation: string;
  industry: string;
  avatar_file: File | null;
  avatar_link: string;
};
type props = {
  profileData?: UserProfile;
  closeForm?: Function;
  professional_skills?: string[];
};
export default function ProfessionalProfileForm({
  profileData,
  closeForm,
  professional_skills,
}: props) {
  const { session } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(professional_skills || []);
  const [enteredSkill, setEnteredSkill] = useState<string>("");
  const industryOptions = useConstantStore((state) => state.industryOptions);

  const [professionalProfile, setProfessionalProfile] =
    useState<ProfessionalProfileFormType>({
      id: profileData?.id || "",
      bio: profileData?.bio || "",
      firstname: profileData?.firstname || "",
      lastname: profileData?.lastname || "",
      email: profileData?.email || "",
      phone_number: profileData?.phone_number || "",
      occupation: profileData?.occupation || "",
      industry: industryOptions[0],
      avatar_file: null,
      avatar_link: profileData?.avatar_link || "",
    });
  const supabase = createClientComponentClient();

  const mutation = useMutation({
    mutationFn: async (data: {
      professionalProfile: ProfessionalProfileFormType;
      skills: string[];
    }) => {
      if (data.professionalProfile.avatar_file) {
        await supabase.storage
          .from("avatar")
          .upload(
            `public/pro-${data.professionalProfile.id}.jpeg`,
            data.professionalProfile.avatar_file,
            {
              cacheControl: "0",
              upsert: true,
              contentType: "image/jpeg",
            }
          );
        const { data: link } = await supabase.storage
          .from("avatar")
          .getPublicUrl(`public/pro-${data.professionalProfile.id}.jpeg`);

        data.professionalProfile.avatar_link = link.publicUrl;
      }
      return await axios.post("/api/profile/professional", data);
    },
    onSuccess: ({ data, status }) => {
      if (status >= 200 && status <= 300) {
        if (closeForm) closeForm();
        else router.refresh();
        toast("Update Successful, wait a while to see changes");
        queryClient.invalidateQueries({
          queryKey: ["retrieveProfessionalProfile"],
        });
      }
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldValue = value;
    setProfessionalProfile((prevProfile) => ({
      ...prevProfile,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session == null) return;
    professionalProfile.id = session.user.id;

    await mutation.mutate({
      professionalProfile,
      skills,
    });
  };

  return (
    <form
      className="w-[300px] md:w-[500px] mx-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="mb-4 flex flex-col justify-center items-start gap-3">
        <div className="border w-[250px] h-[250px] relative">
          <Image
            loader={({ src }) => src}
            src={
              professionalProfile.avatar_link !== null
                ? professionalProfile.avatar_link
                : ""
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
            className="w-full opacity-0 placeholder:upload your avatar"
            onChange={async (e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                setProfessionalProfile((prevProfile) => ({
                  ...prevProfile,
                  avatar_file: file,
                  avatar_link: URL.createObjectURL(file),
                }));
              }
            }}
          ></input>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block mb-2 font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={professionalProfile.firstname}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastname"
            className="block mb-2 font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={professionalProfile.lastname}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={professionalProfile.email}
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
          value={professionalProfile.phone_number}
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
          value={professionalProfile.bio}
          onChange={(e) => handleChange(e)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
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
          value={professionalProfile.occupation}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 flex flex-col gap-4">
        <label htmlFor="industry">Industry</label>
        <select
          id="industry"
          name="industry"
          className="bg-gray-50 border border-gray-300 rounded-lg p-2"
          onChange={handleChange}
        >
          {industryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="skill" className="block mb-2 font-medium text-gray-700">
          Skills
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, idx) => {
            return (
              <div
                key={idx}
                className="bg-gray-300 rounded-full flex items-center justify-center py-2 px-3 gap-0.5"
              >
                <button
                  type="button"
                  className="p-0.5 rounded-full hover:bg-white hover:cursor-pointer"
                  onClick={() => {
                    setSkills((prev) =>
                      prev.filter((skill, index) => index !== idx)
                    );
                  }}
                >
                  <RxCross2 />
                </button>
                <p className="">{skill}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between border rounded-full py-1 px-2 w-[260px] shadow">
          <input
            className="outline-none p-2 rounded-full"
            placeholder="skill .."
            value={enteredSkill}
            onChange={(e) => {
              setEnteredSkill(e.target.value);
            }}
          ></input>
          <button
            className="bg-black text-white p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center hover:opacity-70"
            onClick={(e) => {
              setSkills((prev) => [enteredSkill, ...prev]);
              setEnteredSkill("");
            }}
            type="button"
          >
            <p>+</p>
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <PrimaryButton
          isLoading={mutation.isLoading}
          type="submit"
          text={profileData ? "Update Profile" : "Create Profile"}
          action={() => {}}
        />

        {profileData && closeForm && (
          <SecondaryButton
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
