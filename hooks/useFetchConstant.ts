import { useState, useEffect } from "react";
import axios from "axios";
import { useConstantStore } from "@/libs/slices/constantSlice";

const useFetchConstants = () => {
  const setIndustryOptions = useConstantStore(
    (state) => state.setIndustryOptions
  );
  const setLanguageOptions = useConstantStore(
    (state) => state.setLanguageOptions
  );
  const setBaseLocationOptions = useConstantStore(
    (state) => state.setBaseLocationOptions
  );
  const setSkillset = useConstantStore((state) => state.setSkillset);

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const response = await axios.get("/api/constants");
        setIndustryOptions(response.data.industriOptions);
        setLanguageOptions(response.data.languageOptions);
        setBaseLocationOptions(response.data.baseLocationOptions);
        setSkillset(response.data.skillset);
      } catch (error) {
        console.error("Error fetching constants:", error);
      }
    };

    fetchConstants();
  }, [setBaseLocationOptions, setIndustryOptions, setLanguageOptions]);

  return {};
};

export default useFetchConstants;
