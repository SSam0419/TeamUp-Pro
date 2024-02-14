type UserProfile = {
  id: string;
  last_name: string;
  first_name: string;
  introduction: string;
  skills: string[];
  avatar_link: string;
  email: string;
  phone_number: string;
  location: string;

  twitter_link?: string;
  linkedin_link?: string;
  github_link?: string;

  current_organization: string;
  created_at: Date;

  languages?: string[];

  //below are for professionals only
  professional_profile: {
    professional_introduction?: string;
    resume_link?: string;
    years_of_experience?: number;
    professional_job_title?: string;
    hourly_rate?: number;
    availability?: boolean;
    // projects_completed?: number;
  };
};
