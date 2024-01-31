"use client";

import { IJob } from "@/lib/database/models/job.model";
import React from "react";
import { CiSaveDown2 } from "react-icons/ci";

interface JobCardProps {
  job: IJob;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="py-5 px-7 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium cursor-pointer">{job.position}</h2>
          <span className="text-xs text-gray-500">{job.shortDesc}</span>
        </div>
        <button className="ml-8 p-2 bg-gray-100 rounded-full">
          <CiSaveDown2 size={23} />
        </button>
      </div>

      <div className="border-b-[3px] border-dotted my-3" />
      <div className="flex items-center gap-2">
        <span className="bg-gray-200 rounded-md text-xs py-1 px-2 font-semibold">
          {job.city}
        </span>
        <span className="bg-gray-200 rounded-md text-xs py-1 px-2 font-semibold">
          {job.type}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
