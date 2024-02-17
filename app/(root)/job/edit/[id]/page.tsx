import JobForm from "@/components/shared/JobForm";
import { getJobById } from "@/lib/actions/job.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const EditJob = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const jobDetails = await getJobById({ jobId: params.id });
  return (
    <section className="wrapper">
      <h1 className="text-left pt-10 text-xl font-normal">Edit Vacancy</h1>

      <div className="pt-10">
        <JobForm
          type="Edit"
          userId={JSON.stringify(mongoUser._id)}
          jobDetails={jobDetails}
        />
      </div>
    </section>
  );
};

export default EditJob;
