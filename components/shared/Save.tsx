"use client";

import { toggleSavedJobs } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import React from "react";
import { CiSaveDown2 } from "react-icons/ci";

interface SaveProps {
  isSaved: boolean | undefined;
  userId: string | null;
  jobId: string;
}

const Save = ({ isSaved, userId, jobId }: SaveProps) => {
  const pathname = usePathname();
  const handleSave = async () => {
    await toggleSavedJobs({
      userId: userId!,
      jobId,
      path: pathname,
    });
  };

  return (
    <button
      className={`ml-8 p-2 ${
        isSaved ? "bg-blue-100" : "bg-gray-100"
      } rounded-full`}
      onClick={handleSave}
    >
      <CiSaveDown2 size={23} />
    </button>
  );
};

export default Save;
