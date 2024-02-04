import { create } from "zustand";

type State = {
  languageOptions: string[];
  industryOptions: string[];
  baseLocationOptions: string[];
};

type Actions = {
  setLanguageOptions: (languageOptions: string[]) => void;
  setIndustryOptions: (industryOptions: string[]) => void;
  setBaseLocationOptions: (baseLocationOptions: string[]) => void;
};

export const useConstantStore = create<State & Actions>((set) => ({
  languageOptions: [],
  industryOptions: [],
  baseLocationOptions: [],
  setLanguageOptions: (languageOptions: string[]) =>
    set(() => ({ languageOptions: languageOptions })),
  setIndustryOptions: (industryOptions: string[]) =>
    set(() => ({ industryOptions: industryOptions })),
  setBaseLocationOptions: (baseLocationOptions: string[]) =>
    set(() => ({ baseLocationOptions: baseLocationOptions })),
}));
