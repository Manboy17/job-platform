"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFilters } from "@/lib/actions/job.action";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FiltersState {
  cities?: string[];
  types?: string[];
  industry?: string[];
  experience?: number[];
}

const Filters = () => {
  const [filters, setFilters] = useState<FiltersState>();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getAllFilters = async () => {
      const filters = await getFilters();
      setFilters(filters as FiltersState);
    };

    getAllFilters();
  }, []);

  const handleFilterClick = (filterKey: string, filterValue: string) => {
    let newUrl = "";
    const currentSearchParams = searchParams.toString();

    const existingFilters = qs.parse(currentSearchParams);

    const newFilters = filterValue
      ? { ...existingFilters, [filterKey]: filterValue }
      : existingFilters;

    newUrl = formUrlQuery({
      params: currentSearchParams,
      // @ts-ignore
      filters: newFilters,
    });

    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-6 w-full md:flex-nowrap">
      <Select
        onValueChange={(value: string) => handleFilterClick("city", value)}
      >
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {filters?.cities?.map((city: string, i) => (
            <SelectItem value={city} key={i}>
              {city}
            </SelectItem>
          )) ?? []}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => handleFilterClick("type", value)}
      >
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          {filters?.types?.map((type: string, i) => (
            <SelectItem value={type} key={i}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => handleFilterClick("industry", value)}
      >
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          {filters?.industry?.map((industry: string, i) => (
            <SelectItem value={industry} key={i}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) =>
          handleFilterClick("experience", value)
        }
      >
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          {filters?.experience?.map((experience: number, i) => (
            <SelectItem value={experience.toString()} key={i}>
              {experience}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
