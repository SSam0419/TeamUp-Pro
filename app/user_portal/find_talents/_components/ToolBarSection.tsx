import SearchQuery from "@/components/SearchQuery";
import React from "react";
import SendRequestButton from "./SendRequestButton";

const ToolBarSection = ({
  isLoading,
  professionalIds,
}: {
  isLoading: boolean;
  professionalIds: string[];
}) => {
  return (
    <div className="flex flex-col items-center bg-white p-5 rounded-xl border">
      <div className="w-[800px] flex flex-col items-center gap-3">
        <SearchQuery
          isLoading={isLoading}
          placeholderText="Search for professionals with specific skill"
        />
        <SendRequestButton professionalIds={professionalIds} />
      </div>
    </div>
  );
};

export default ToolBarSection;
