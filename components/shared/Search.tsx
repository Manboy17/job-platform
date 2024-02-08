"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      let newUrl = "";

      if (value) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: value.toLowerCase(),
        });
      } else {
        newUrl = removeUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });
      }

      router.replace(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(debouncedFn);
  }, [value, searchParams, router]);

  return (
    <div className="flex min-h-[40px] min-w-[180px] items-center w-full overflow-hidden rounded-md px-2 border-2 border-grey-50">
      <CiSearch size={25} className="cursor-pointer" />
      <Input
        className="border-none outline-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-transparent"
        placeholder="Search jobs..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Search;
