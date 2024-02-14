"use client";

import CustomButton from "@/components/CustomButtons/CustomButton";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { useAppStore } from "@/libs/ZustandStore";
import { useConstantStore } from "@/libs/slices/constantSlice";
import { UserProfileClass } from "@/libs/models/UserProfileClass/UserProfileClass";
import {
  CreateProfessionalProfileFormType,
  CreateUserProfileFormType,
} from "@/libs/models/UserProfileClass/UserProfileUtility";
import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import {
  FormInput,
  FormLanguageMultipleSelect,
  FormTextarea,
} from "./ProfileFormFields";
import { CiSettings } from "react-icons/ci";
import { FaCircleInfo } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";

type PlaceholderMap = {
  [key: string]: string;
};
const placeholderMap: PlaceholderMap = {
  professional_introduction: "I am an experienced professional...",
  resume_link: "https://example.com/resume.pdf",
  professional_job_title: "Software Engineer",
  hourly_rate: "100 USD",
};

export default function ProfessionalProfileForm() {
  const { session, profileInfo } = useAppStore();

  const skillset = useConstantStore((state) => state.skillset);

  const queryClient = useQueryClient();

  const [disableEdit, setDisableEdit] = useState<boolean>(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [professionalProfile, setProfessionalProfile] =
    useState<CreateProfessionalProfileFormType>({
      id: session?.user.id || "",
      professional_introduction: "",
      resume_link: "",
      professional_job_title: "",
      hourly_rate: 0,
      availability: true,
      skills: [],
    });

  useEffect(() => {
    setProfessionalProfile({
      id: session?.user.id || "",
      professional_introduction:
        profileInfo?.professionalProfile.professionalIntroduction || "",
      resume_link: profileInfo?.professionalProfile.resumeLink || "",
      professional_job_title:
        profileInfo?.professionalProfile.professionalJobTitle || "",
      hourly_rate: profileInfo?.professionalProfile.hourlyRate || 0,
      availability: profileInfo?.professionalProfile.availability || true,
      skills: profileInfo?.professionalProfile.skills || [],
    });
  }, [profileInfo, session?.user.id]);

  const mutation = useMutation({
    mutationFn: async ({
      userProfileData,
      avatarFile,
    }: {
      userProfileData: CreateUserProfileFormType;
      avatarFile: File | null;
    }) => {
      return await new UserProfileClass().create({
        userProfileData,
        avatarFile,
      });
    },
    onSuccess: ({ data, status }) => {
      if (status >= 200 && status <= 300) {
        toast.success("Update Successful, wait a while to see changes");
        queryClient.invalidateQueries({
          queryKey: ["retrieveUserProfile"],
        });
        setDisableEdit(true);
      }
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let fieldValue: string | string[] = value;
    if (name == "languages") {
      fieldValue = fieldValue.split(",");
    }

    setProfessionalProfile((prevProfile) => ({
      ...prevProfile,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session == null) return;

    professionalProfile.id = session.user.id;
    // await mutation.mutate({ userProfileData: userProfile, avatarFile: null });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (!session) {
    return <UnauthorizedPage />;
  }
  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        {/* personal */}
        <div className="flex gapy-3 justify-between items-center w-full my-2">
          <div className="border w-full"></div>
          <div className="w-full text-center flex items-center justify-evenly">
            <FaCircleInfo /> Professional
          </div>
          <div className="border w-full"></div>
        </div>

        <div className="mt-1">
          <div className="flex gap-1 justify-between">
            <FormInput
              isDisabled={disableEdit}
              onChange={handleChange}
              value={professionalProfile.hourly_rate.toString()}
              label={"Hourly Rate"}
              name="hourly_rate"
              placeholder={placeholderMap.hourly_rate}
            />

            <FormInput
              isDisabled={disableEdit}
              onChange={handleChange}
              value={professionalProfile.availability.toString()}
              label={"Your availability"}
              name="availability"
              placeholder={placeholderMap.availability}
            />
          </div>
        </div>

        <div className="mt-1">
          <FormInput
            isDisabled={disableEdit}
            onChange={handleChange}
            value={professionalProfile.professional_job_title}
            label={"Professional Job Title"}
            name="professional_job_title"
            placeholder={placeholderMap.professional_job_title}
          />
        </div>

        <div className="mt-1">
          <FormTextarea
            isDisabled={disableEdit}
            onChange={handleChange}
            value={professionalProfile.professional_introduction}
            label={"Professional Introduction"}
            name="Professional Introduction"
            placeholder={placeholderMap.professional_introduction}
          />
        </div>
        <div className="mt-3">
          <div className="py-3 w-full">
            <Select
              isDisabled={false}
              labelPlacement="outside"
              selectionMode="multiple"
              label={"Skills"}
              placeholder={"Showcase your expertise"}
              onChange={(e) => {}}
            >
              {skillset
                .sort((a, b) => a.industry.localeCompare(b.industry))
                .map((skillset) => (
                  <SelectItem key={skillset.skill} value={skillset.skill}>
                    {skillset.industry} - {skillset.skill}
                  </SelectItem>
                ))}
            </Select>
          </div>
        </div>

        <div className="mt-1">
          <p className="my-1 text-small">Upload Resume (PDF)</p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF (MAX. 500 KB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".pdf"
              />
            </label>
          </div>
        </div>

        <Divider className="my-3" />
        <div className="py-3">
          {profileInfo == null ? (
            <CustomButton
              disabled={disableEdit}
              type="submit"
              action={() => {}}
              text="Confirm"
            />
          ) : (
            <div className="flex gap-2 items-center">
              <CustomButton
                action={() => {
                  setDisableEdit((prev) => !prev);
                }}
                text={`${disableEdit ? "Enter Edit Mode" : "Cancel"}`}
                style="bordered"
                icon={disableEdit ? <CiSettings size={25} /> : null}
              />
              <CustomButton
                disabled={disableEdit}
                type="submit"
                action={() => {}}
                text="Update"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
