"use client";

import CustomButton from "@/components/CustomButtons/CustomButton";
import UnauthorizedPage from "@/components/UnauthorizedPage";
import { useAppStore } from "@/libs/ZustandStore";
import { useConstantStore } from "@/libs/slices/constantSlice";
import { UserProfileClass } from "@/libs/models/UserProfileClass/UserProfileClass";
import { CreateProfessionalProfileFormType } from "@/libs/models/UserProfileClass/UserProfileUtility";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import {
  FormInput,
  FormSkillsetMultipleSelect,
  FormTextarea,
} from "./ProfileFormFields";
import { CiSettings } from "react-icons/ci";
import { FaCircleInfo } from "react-icons/fa6";

type PlaceholderMap = {
  [key: string]: string;
};
const placeholderMap: PlaceholderMap = {
  professional_introduction: "I am an experienced professional...",
  resume_link: "https://example.com/resume.pdf",
  professional_job_title: "Software Engineer",
  hourly_rate: "100 USD",
  availability: "Availability",
};

export default function ProfessionalProfileForm() {
  const { session, profileInfo } = useAppStore();

  const skillset = useConstantStore((state) => state.skillset);

  const queryClient = useQueryClient();

  const [disableEdit, setDisableEdit] = useState<boolean>(true);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
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

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      professionalProfileData,
      resumeFile,
    }: {
      professionalProfileData: CreateProfessionalProfileFormType;
      resumeFile: File | null;
    }) => {
      const { data } =
        await new UserProfileClass().professionalProfile.createOrUpdate({
          professionalProfileData,
          resumeFile,
        });
      return { data: data.data, status: data.status };
    },
    onSuccess: ({ data, status }) => {
      if (status >= 200 && status <= 300) {
        toast.success("Update Successful, wait a while to see changes");
        queryClient.invalidateQueries({
          queryKey: ["retrieveUserProfile"],
        });
        setDisableEdit(true);
      } else {
        toast.error("Something went wrong, try again later");
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
    await mutate({
      professionalProfileData: professionalProfile,
      resumeFile: resumeFile,
    });
  };

  const resumeUploadRef = useRef<HTMLInputElement>(null);

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

            <div className="py-3 w-full">
              <Select
                isDisabled={disableEdit}
                label={"Your availability"}
                labelPlacement="outside"
                selectedKeys={
                  professionalProfile.availability ? ["Yes"] : ["No"]
                }
                onChange={(e) => {
                  const availability = e.target.value === "Yes" ? true : false;
                  setProfessionalProfile((prevProfile) => ({
                    ...prevProfile,
                    availability: availability,
                  }));
                }}
                name={"availability"}
              >
                <SelectItem key="Yes" value={"Yes"} textValue="Yes">
                  Yes
                </SelectItem>
                <SelectItem key="No" value={"No"} textValue="No">
                  No
                </SelectItem>
              </Select>
            </div>
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
            name="professional_introduction"
            placeholder={placeholderMap.professional_introduction}
          />
        </div>
        <div className="mt-3">
          <div className="py-3 w-full">
            <FormSkillsetMultipleSelect
              selectedKeys={professionalProfile.skills || []}
              skillset={skillset}
              isDisabled={disableEdit}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const skills = e.target.value.split(",");
                setProfessionalProfile((prev) => ({ ...prev, skills: skills }));
              }}
            />
          </div>
        </div>

        <div className="mt-1">
          <p className="my-1 text-small">Upload Resume (PDF)</p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {resumeFile ? (
                <>
                  <Button
                    isDisabled={disableEdit || isLoading}
                    className="w-full rounded-none rounded-tl rounded-tr"
                    onClick={() => {
                      setResumeFile(null);
                    }}
                  >
                    Reset
                  </Button>
                  <embed
                    src={URL.createObjectURL(resumeFile)}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                </>
              ) : professionalProfile.resume_link ? (
                <>
                  <Button
                    isDisabled={disableEdit || isLoading}
                    className="w-full rounded-none rounded-tl rounded-tr"
                    onClick={() => {
                      setProfessionalProfile((prev) => ({
                        ...prev,
                        resume_link: null,
                      }));
                    }}
                  >
                    Reset
                  </Button>
                  <embed
                    src={professionalProfile.resume_link}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                </>
              ) : (
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF (MAX. 500 KB)
                  </p>
                </div>
              )}
              <input
                ref={resumeUploadRef}
                disabled={disableEdit}
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    if (file.size < 500000) {
                      setResumeFile(file);
                    } else {
                      toast.error("File size exceeds 500 KB.");
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>

        <Divider className="my-3" />
        <div className="py-3">
          {profileInfo?.professionalProfile == null ? (
            <CustomButton
              isLoading={isLoading}
              disabled={disableEdit}
              type="submit"
              action={() => {}}
              text="Become a professional"
            />
          ) : (
            <div className="flex gap-2 items-center">
              <CustomButton
                action={() => {
                  setDisableEdit((prev) => !prev);
                }}
                disabled={isLoading}
                text={`${disableEdit ? "Enter Edit Mode" : "Cancel"}`}
                style="bordered"
                icon={disableEdit ? <CiSettings size={25} /> : null}
              />
              <CustomButton
                isLoading={isLoading}
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
