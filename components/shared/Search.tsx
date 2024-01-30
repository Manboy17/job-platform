"use client";

import React from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="flex min-h-[40px] min-w-[180px] items-center w-full overflow-hidden rounded-md px-2 border-2 border-grey-50">
      <CiSearch size={25} className="cursor-pointer" />
      <Input
        className="border-none outline-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-transparent"
        placeholder="Search jobs..."
      />
    </div>
  );
};

export default Search;
