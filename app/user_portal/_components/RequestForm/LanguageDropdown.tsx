import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

type props = {
  setLanguages: Function;
  availableLanguages: string[];
};

export default function LanguageDropdown({
  setLanguages,
  availableLanguages,
}: props) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    availableLanguages[0],
  ]);

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguages((prevLanguages) => [...prevLanguages, language]);
    setLanguages(selectedLanguages);
  };

  const handleLanguageRemoval = (language: string) => {
    if (selectedLanguages.length <= 1) {
      return;
    }
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.filter((prevLanguage) => prevLanguage !== language)
    );
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap">
        {selectedLanguages.map((lang: string) => (
          <div className="relative" key={lang}>
            <Button className="border px-2 py-1 rounded-xl hover:cursor-pointer hover:bg-slate-300 hover:text-gray-500 hover:opacity-60 bg-white">
              {lang}
            </Button>
            <Button
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-white border"
              onClick={() => {
                handleLanguageRemoval(lang);
              }}
            >
              X
            </Button>
          </div>
        ))}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat">Add Language</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Languages">
            {availableLanguages
              .filter((lang) => !selectedLanguages.includes(lang))
              .map((language: string, idx) => (
                <DropdownItem
                  key={language}
                  onClick={() => handleLanguageSelection(language)}
                >
                  {language}
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}
