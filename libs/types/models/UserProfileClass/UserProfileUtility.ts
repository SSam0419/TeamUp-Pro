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
  avatar_link?: string;
  twitter_link?: string;
  github_link?: string;
  linkedin_link?: string;
  languages: string[];
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
