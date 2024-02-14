import { Input } from "@nextui-org/react";
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
    <Input
      startContent={<AiOutlineSearch />}
      type="text"
      variant="bordered"
      className="w-full bg-white"
      placeholder={placeholderText}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      value={query}
    />
  );
};

export default SearchQuery;
