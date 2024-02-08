"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobs } from "@/lib/actions/job.action";
import { IJob } from "@/lib/database/models/job.model";

const Filters = () => {
  // const [jobs, setJobs] = useState<IJob[]>([]);
  // useEffect(() => {
  //   const getAllJobs = async () => {
  //     const jobList = await getJobs();
  //     setJobs(jobList);
  //   };

  //   getAllJobs();
  // }, []);

  // const uniqueCities = Array.from(new Set(jobs.map((job: IJob) => job.city)));
  // const uniqueTypes = Array.from(new Set(jobs.map((job: IJob) => job.type)));
  // const uniqueIndustry = Array.from(
  //   new Set(jobs.map((job: IJob) => job.industry))
  // );
  // const uniqueExperience = Array.from(
  //   new Set(jobs.map((job: IJob) => job.experience))
  // );

  return (
    <div className="flex flex-wrap items-center gap-6 w-full md:flex-nowrap">
      {/* <Select>
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {uniqueCities.map((city: string, i) => (
            <SelectItem value={city} key={i}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          {uniqueTypes.map((type: string, i) => (
            <SelectItem value={type} key={i}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          {uniqueIndustry.map((industry: string, i) => (
            <SelectItem value={industry} key={i}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="select-field w-[180px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          {uniqueExperience.map((experience: number, i) => (
            <SelectItem value={experience.toString()} key={i}>
              {experience}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default Filters;
