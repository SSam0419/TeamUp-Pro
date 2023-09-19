"use client";

import { IndustriesOptions } from "@/types/constants/industries";
import { useAppStore } from "@/libs/ZustandStore";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { RxCross2 } from "react-icons/rx";

export type ProfessionalProfileFormType = {
  id: string;
  bio: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  occupation: string;
  resume: File | null;
  industry: (typeof IndustriesOptions)[number] | string;
};

export default function ProfessionalProfileForm() {
  const { session } = useAppStore();

  const [skills, setSkills] = useState<string[]>([]);
  const [enteredSkill, setEnteredSkill] = useState<string>("");

  const [professionalProfile, setProfessionalProfile] =
    useState<ProfessionalProfileFormType>({
      id: "",
      bio: "",
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      occupation: "",
      industry: IndustriesOptions[0],
      resume: null,
    });

  const mutation = useMutation({
    mutationFn: async (data: {
      professionalProfile: ProfessionalProfileFormType;
      skills: string[];
    }) => {
      return await axios.post("/api/professional/profile", data);
    },
    onSuccess: ({ data, status }) => {
      console.log("onSuccess: ", data);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session == null) return;
    professionalProfile.id = session.user.id;

    mutation.mutate({
      professionalProfile,
      skills,
    });
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-between">
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
          {IndustriesOptions.map((option) => (
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
        <div className="flex items-center justify-between border-1 border rounded-full py-1 px-2 w-[260px] shadow">
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

      <button
        type="submit"
        className="w-full px-4 py-3 text-white bg-primary rounded-md hover:bg-primary focus:outline-none focus:bg-primary hover:opacity-70"
      >
        Create Profile
      </button>
    </form>
  );
}
