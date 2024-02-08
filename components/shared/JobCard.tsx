"use client";

import { IJob } from "@/lib/database/models/job.model";
import Link from "next/link";
import React from "react";
import Save from "./Save";

interface JobCardProps {
  job: IJob;
  isMainPage: boolean;
  userId?: string;
  isSaved?: boolean;
}

const JobCard = ({ job, isMainPage, userId, isSaved }: JobCardProps) => {
  return (
    <div
      className={`py-5 px-7 ${
        isMainPage ? "bg-white" : "bg-gray-100"
      } rounded-xl`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Link href={`/job/${job._id}`}>
            <h2 className="text-lg font-medium">{job.position}</h2>
          </Link>
          <span className="text-xs text-gray-500 line-clamp-1">
            {job.shortDesc}
          </span>
        </div>
        <Save isSaved={isSaved} userId={userId!} jobId={job._id} />
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
