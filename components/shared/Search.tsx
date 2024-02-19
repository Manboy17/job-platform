"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { formSearchUrlQuery, removeUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [search, setSearch] = useState(query || "");
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formSearchUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search.toLowerCase(),
        });

        router.replace(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["search"],
          });
          router.replace(newUrl, { scroll: false });
        }
        setSearch("");
      }

      return () => clearTimeout(delayDebounceFn);
    }, 300);
  }, [search, router, searchParams, query]);

  return (
    <div className="flex min-h-[40px] min-w-[180px] items-center w-full overflow-hidden rounded-md px-2 border-2 border-grey-50">
      <CiSearch size={25} className="cursor-pointer" />
      <Input
        className="border-none outline-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-transparent"
        placeholder="Search jobs..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};

export default Search;
