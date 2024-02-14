import { create } from "zustand";

type State = {
  languageOptions: string[];
  industryOptions: string[];
  baseLocationOptions: string[];
  skillset: { skill: string; industry: string }[];
};

type Actions = {
  setLanguageOptions: (languageOptions: string[]) => void;
  setIndustryOptions: (industryOptions: string[]) => void;
  setBaseLocationOptions: (baseLocationOptions: string[]) => void;
  setSkillset: (skillset: { skill: string; industry: string }[]) => void;
};

export const useConstantStore = create<State & Actions>((set) => ({
  languageOptions: [],
  industryOptions: [],
  baseLocationOptions: [],
  skillset: [],
  setLanguageOptions: (languageOptions: string[]) =>
    set(() => ({ languageOptions: languageOptions })),
  setIndustryOptions: (industryOptions: string[]) =>
    set(() => ({ industryOptions: industryOptions })),
  setBaseLocationOptions: (baseLocationOptions: string[]) =>
    set(() => ({ baseLocationOptions: baseLocationOptions })),
  setSkillset: (skillset: { skill: string; industry: string }[]) =>
    set(() => ({ skillset: skillset })),
}));
