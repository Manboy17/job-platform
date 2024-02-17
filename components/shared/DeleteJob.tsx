"use client";

import { deleteJob } from "@/lib/actions/job.action";
import { usePathname } from "next/navigation";
import React, { useTransition } from "react";
import { MdDelete } from "react-icons/md";
interface DeleteJobProps {
  jobId: string;
}

const DeleteJob = ({ jobId }: DeleteJobProps) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  return (
    <MdDelete
      size={20}
      className="cursor-pointer"
      onClick={() =>
        startTransition(async () => {
          await deleteJob({ jobId, path: pathname });
        })
      }
    />
  );
};

export default DeleteJob;
