"use client";

import { toggleSaveJobs } from "@/lib/actions/user.action";
import { IJob } from "@/lib/database/models/job.model";
import { usePathname } from "next/navigation";
import React from "react";
import { CiSaveDown2 } from "react-icons/ci";

interface JobCardProps {
  job: IJob;
  isMainPage: boolean;
  userId?: string;
  isSaved?: boolean;
}

const JobCard = ({ job, isMainPage, userId, isSaved }: JobCardProps) => {
  const pathname = usePathname();

  const handleSave = async () => {
    await toggleSaveJobs({
      userId: userId!,
      jobId: job._id,
      path: pathname,
    });
  };
  return (
    <div
      className={`py-5 px-7 ${
        isMainPage ? "bg-white" : "bg-gray-100"
      } rounded-xl`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium cursor-pointer">{job.position}</h2>
          <span className="text-xs text-gray-500">{job.shortDesc}</span>
        </div>
        <button
          className={`ml-8 p-2 rounded-full ${
            isSaved ? "bg-blue-100" : "bg-gray-100"
          }`}
          onClick={handleSave}
        >
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
