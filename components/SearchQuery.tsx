import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchQuery = ({
  isLoading,
  placeholderText,
}: {
  isLoading: boolean;
  placeholderText: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const changeQuery = (userQuery: string) => {
      if (!userQuery) {
        current.delete("query");
      } else {
        current.set("query", userQuery);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    };

    const debounceTimer = setTimeout(() => {
      changeQuery(query);
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [pathname, query, router, searchParams]);

  return (
    <div className="flex justify-between items-center w-full h-full">
      {/* <div className="rounded-full bg-white border shadow px-5 py-2 flex justify-between items-center"> */}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between">
          <label className="">
            <AiOutlineSearch />
          </label>
          <div className="border-l h-6 mx-2"></div>
        </div>
        <input
          className="outline-none bg-white text-base placeholder:italic placeholder:font-thin"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          placeholder={placeholderText}
        ></input>
      </div>
    </div>
  );
};

export default SearchQuery;
