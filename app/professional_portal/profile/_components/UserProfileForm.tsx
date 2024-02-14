"use client";

import CustomButton from "@/components/CustomButtons/CustomButton";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { useAppStore } from "@/libs/ZustandStore";
import { useConstantStore } from "@/libs/slices/constantSlice";
import { UserProfileClass } from "@/libs/types/models/UserProfileClass/UserProfileClass";
import { CreateUserProfileFormType } from "@/libs/types/models/UserProfileClass/UserProfileUtility";
import { Divider, Input } from "@nextui-org/react";
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
} from "./userProfileFormFields";
import { CiSettings } from "react-icons/ci";
import { FaCircleInfo } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";

type props = {
  profileData?: UserProfileClass;
  closeForm?: Function;
};

const formatFieldName = (fieldName: string) => {
  // Convert underscore-separated to Title Case
  const words = fieldName.split("_");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.join(" ");
};

type PlaceholderMap = {
  [key: string]: string;
};

const placeholderMap: PlaceholderMap = {
  id: "e.g., 123456",
  introduction: "e.g., Hi, I'm John Doe!",
  email: "e.g., example@example.com",
  current_organization: "e.g., ABC Company",
  phone_number: "e.g., 123-456-7890",
  lastname: "e.g., Doe",
  firstname: "e.g., John",
  years_of_experience: "e.g., 5",
  avatar_link: "e.g., https://example.com/avatar.jpg",
  twitter_link: "e.g., https://twitter.com/example",
  github_link: "e.g., https://github.com/example",
  linkedin_link: "e.g., https://linkedin.com/in/example",
  languages: "e.g., Chinese, English",
};

export default function UserProfileForm() {
  const { session, profileInfo } = useAppStore();

  const languageOptions = useConstantStore((state) => state.languageOptions);
  const queryClient = useQueryClient();
  const [disableEdit, setDisableEdit] = useState<boolean>(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userProfile, setUserProfile] = useState<CreateUserProfileFormType>({
    id: session?.user.id || "",
    avatar_link: profileInfo?.avatarLink || "",

    lastname: profileInfo?.lastname || "",
    firstname: profileInfo?.firstname || "",

    languages: profileInfo?.languages || [],

    introduction: profileInfo?.introduction || "",

    current_organization: profileInfo?.currentOrganization || "",
    phone_number: profileInfo?.phoneNumber || "",
    email: profileInfo?.email || "",
    years_of_experience: profileInfo?.years_of_experience || 0,

    twitter_link: profileInfo?.twitterLink || "",
    github_link: profileInfo?.githubLink || "",
    linkedin_link: profileInfo?.linkedinLink || "",
  });

  useEffect(() => {
    setUserProfile({
      id: session?.user.id || "",
      avatar_link: profileInfo?.avatarLink || "",

      lastname: profileInfo?.lastname || "",
      firstname: profileInfo?.firstname || "",

      languages: profileInfo?.languages || [],

      introduction: profileInfo?.introduction || "",

      current_organization: profileInfo?.currentOrganization || "",

      phone_number: profileInfo?.phoneNumber || "",
      email: profileInfo?.email || "",
      years_of_experience: profileInfo?.years_of_experience || 0,

      twitter_link: profileInfo?.twitterLink || "",
      github_link: profileInfo?.githubLink || "",
      linkedin_link: profileInfo?.linkedinLink || "",
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

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session == null) return;

    userProfile.id = session.user.id;
    await mutation.mutate({ userProfileData: userProfile, avatarFile: null });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (!session) {
    return <UnauthorizedPage />;
  }
  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        {/* personal */}
        <div className="flex gap-3 justify-between items-center w-full my-2">
          <div className="border w-full"></div>
          <div className="w-full text-center flex items-center justify-evenly">
            <FaCircleInfo /> Personal
          </div>
          <div className="border w-full"></div>
        </div>

        <div className="mt-1">
          <div className="flex items-center justify-center">
            {/* {avatarFile ? ( */}
            <div className="my-3">
              {avatarFile ? (
                <Image
                  src={
                    avatarFile
                      ? URL.createObjectURL(avatarFile)
                      : "/default-avatar.png"
                  }
                  width={150}
                  height={150}
                  alt={""}
                  className="border rounded-full shadow h-[150px] w-[150px] hover:cursor-pointer"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                />
              ) : (
                <div
                  className="flex items-center justify-center border rounded-full shadow h-[150px] w-[150px] hover:cursor-pointer"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                >
                  <AiOutlineCloudUpload size={30} />
                </div>
              )}
              <input
                disabled={disableEdit}
                type="file"
                className="hidden w-full h-full z-50"
                accept=".png, .jpeg, .jpg"
                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) setAvatarFile(file);
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="flex gap-1 justify-between">
            <FormInput
              isDisabled={disableEdit}
              onChange={handleChange}
              value={userProfile.firstname}
              label={formatFieldName("firstname")}
              name="firstname"
              placeholder={placeholderMap.firstname}
            />

            <FormInput
              isDisabled={disableEdit}
              onChange={handleChange}
              value={userProfile.lastname}
              label={formatFieldName("lastname")}
              name="lastname"
              placeholder={placeholderMap.lastname}
            />
          </div>
        </div>

        <div className="mt-1">
          <div className="flex gap-1 justify-between">
            <FormInput
              isDisabled={disableEdit}
              onChange={handleChange}
              value={userProfile.current_organization}
              label={formatFieldName("current_organization")}
              name="current_organization"
              placeholder={placeholderMap.current_organization}
            />

            <FormInput
              isDisabled={disableEdit}
              onChange={handleChange}
              value={userProfile.years_of_experience.toString()}
              label={formatFieldName("years_of_experience")}
              name="years_of_experience"
              placeholder={placeholderMap.years_of_experience}
            />
          </div>
        </div>

        <div className="mt-1">
          <FormLanguageMultipleSelect
            isDisabled={disableEdit}
            onChange={handleChange}
            value={userProfile.languages}
            label={formatFieldName("languages")}
            name="languages"
            placeholder={placeholderMap.languages}
            languageOptions={languageOptions}
          />
        </div>
        <div className="mt-1">
          <FormTextarea
            isDisabled={disableEdit}
            onChange={handleChange}
            value={userProfile.introduction}
            label={formatFieldName("introduction")}
            name="introduction"
            placeholder={placeholderMap.introduction}
          />
        </div>
        <div className="mt-1">
          <FormInput
            isDisabled={disableEdit}
            onChange={handleChange}
            value={userProfile.phone_number}
            label={formatFieldName("phone_number")}
            name="phone_number"
            placeholder={placeholderMap.phone_number}
          />
        </div>
        <div className="mt-1">
          <FormInput
            isDisabled={disableEdit}
            onChange={handleChange}
            value={userProfile.email}
            label={formatFieldName("email")}
            name="email"
            placeholder={placeholderMap.email}
          />
        </div>

        {/* social medias */}
        <div className="flex gap-3 justify-between items-center w-full my-2">
          <div className="border w-full"></div>
          <div className="w-full text-center flex items-center justify-evenly">
            <IoShareSocialSharp /> Social Links
          </div>
          <div className="border w-full"></div>
        </div>
        {Object.entries(userProfile)
          .slice(10)
          .map(([key, value]) => {
            return (
              <div key={key} className="mt-1">
                <FormInput
                  isDisabled={disableEdit}
                  onChange={handleChange}
                  value={value}
                  label={formatFieldName(key + " (Optional)")}
                  name={key}
                  placeholder={placeholderMap[key]}
                />
              </div>
            );
          })}
        <Divider className="my-3" />
        <div className="p-3">
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
