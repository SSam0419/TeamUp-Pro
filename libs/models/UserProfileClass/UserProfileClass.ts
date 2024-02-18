import * as Utility from "./UserProfileUtility";

export class UserProfileClass {
  id: string | null = null;
  introduction: string | null = null;
  email: string | null = null;
  currentOrganization: string | null = null;
  phoneNumber: string | null = null;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  lastname: string | null = null;
  firstname: string | null = null;
  avatarLink: string | null = null;
  twitterLink: string | null = null;
  githubLink: string | null = null;
  linkedinLink: string | null = null;
  languages: string[] = [];
  years_of_experience: number = 0;
  professionalProfile: ProfessionalProfile = new ProfessionalProfile();

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.introduction = data.introduction;
      this.email = data.email;
      this.currentOrganization = data.current_organization;
      this.phoneNumber = data.phone_number;
      this.createdAt = new Date(data.created_at);
      this.updatedAt = new Date(data.updated_at);
      this.lastname = data.lastname;
      this.firstname = data.firstname;
      this.avatarLink = data.avatar_link;
      this.twitterLink = data.twitter_link;
      this.githubLink = data.github_link;
      this.linkedinLink = data.linkedin_link;
      this.languages = data.languages;
      this.years_of_experience = data.years_of_experience;

      this.professionalProfile = new ProfessionalProfile(
        data.professional_profile.skills,
        new Date(data.professional_profile.created_at),
        new Date(data.professional_profile.updated_at),
        data.professional_profile.hourly_rate,
        data.professional_profile.resume_link,
        data.professional_profile.availability,
        data.professional_profile.years_of_experience,
        data.professional_profile.professional_job_title,
        data.professional_profile.professional_introduction
      );
    }
  }

  async createOrUpdate({
    userProfileData,
    avatarFile,
  }: {
    userProfileData: Utility.CreateUserProfileFormType;
    avatarFile: File | null;
  }) {
    return await Utility.createUserProfile({ userProfileData, avatarFile });
  }
}

class ProfessionalProfile {
  skills: string[] = [];
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  hourlyRate: number | null = null;
  resumeLink: string | null = null;
  availability: boolean = false;
  yearsOfExperience: number | null = null;
  professionalJobTitle: string | null = null;
  professionalIntroduction: string | null = null;

  constructor(
    skills: string[] = [],
    createdAt: Date | null = null,
    updatedAt: Date | null = null,
    hourlyRate: number | null = null,
    resumeLink: string | null = null,
    availability: boolean = false,
    yearsOfExperience: number | null = null,
    professionalJobTitle: string | null = null,
    professionalIntroduction: string | null = null
  ) {
    this.skills = skills;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.hourlyRate = hourlyRate;
    this.resumeLink = resumeLink;
    this.availability = availability;
    this.yearsOfExperience = yearsOfExperience;
    this.professionalJobTitle = professionalJobTitle;
    this.professionalIntroduction = professionalIntroduction;
  }

  async createOrUpdate({
    professionalProfileData,
    resumeFile,
  }: {
    professionalProfileData: Utility.CreateProfessionalProfileFormType;
    resumeFile: File | null;
  }) {
    return await Utility.createProfessionalProfile({
      professionalProfileData,
      resumeFile,
    });
  }
}
