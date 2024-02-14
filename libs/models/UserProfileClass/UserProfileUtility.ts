import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

export interface CreateUserProfileFormType {
  id: string;
  introduction: string;
  email: string;
  current_organization: string;
  phone_number: string;
  lastname: string;
  firstname: string;
  years_of_experience: number;
  avatar_link?: string | null;
  twitter_link?: string;
  github_link?: string;
  linkedin_link?: string;
  languages: string[];
}

export interface CreateProfessionalProfileFormType {
  id: string;
  professional_introduction: string;
  resume_link: string;
  professional_job_title: string;
  hourly_rate: number;
  availability: boolean;
  skills: string[];
}

export async function createUserProfile({
  userProfileData,
  avatarFile,
}: {
  userProfileData: CreateUserProfileFormType;
  avatarFile: File | null;
}) {
  if (userProfileData.id === "" || !userProfileData.id) {
    throw new Error("Id is missing");
  }

  const supabase = createClientComponentClient();

  if (avatarFile) {
    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(`public/user-${userProfileData.id}.jpeg`, avatarFile, {
        cacheControl: "0",
        upsert: true,
        contentType: "image/jpeg",
      });

    if (!error) {
      const { data: link } = await supabase.storage
        .from("avatar")
        .getPublicUrl(`public/user-${userProfileData.id}.jpeg`);

      userProfileData.avatar_link = link.publicUrl;
    }
  }

  return await axios.post("/api/profile/user", userProfileData);
}

export async function createProfessionalProfile({
  professionalProfileData,
  resumeFile,
}: {
  professionalProfileData: CreateProfessionalProfileFormType;
  resumeFile: File | null;
}) {
  if (professionalProfileData.id === "" || !professionalProfileData.id) {
    throw new Error("Id is missing");
  }

  const supabase = createClientComponentClient();

  if (resumeFile) {
    const { data, error } = await supabase.storage
      .from("resume")
      .upload(`public/user-${professionalProfileData.id}.pdf`, resumeFile, {
        cacheControl: "0",
        upsert: true,
        contentType: "application/pdf",
      });

    if (!error) {
      const { data: link } = await supabase.storage
        .from("resume")
        .getPublicUrl(`public/user-${professionalProfileData.id}.pdf`);

      professionalProfileData.resume_link = link.publicUrl;
    }
  }

  return await axios.post("/api/profile/professional", professionalProfileData);
}
