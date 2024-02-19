import Save from "@/components/shared/Save";
import ParsedHTML from "@/components/shared/ParsedHTML";
import { getJobById } from "@/lib/actions/job.action";
import { getUserById } from "@/lib/actions/user.action";
import { IJob } from "@/lib/database/models/job.model";
import { auth } from "@clerk/nextjs";
import React from "react";
import { FaStar } from "react-icons/fa";

const JobDetails = async ({ params: { id } }: { params: { id: string } }) => {
  const job: IJob = await getJobById({ jobId: id });
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });
  return (
    <section className="bg-gray-100 p-5">
      <div className="wrapper p-5 bg-white">
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold lg:text-3xl flex items-center gap-3">
              {job.position} <FaStar size={15} className="text-blue-500" />
            </h1>
            <span className="text-xs tracking-wide md:text-sm text-gray-500">
              {job.shortDesc}
            </span>
          </div>

          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-2 text-sm rounded-md">
              Apply
            </button>
            <Save
              isSaved={mongoUser?.saved.includes(job._id)}
              userId={mongoUser?._id}
              jobId={job._id}
            />
          </div>
        </div>

        <div className="border-b-[1px] my-5" />

        <div>
          <h2 className="text-sm lg:text-lg md:text-md font-medium">
            Here is a short summary of this vacancy:
          </h2>
          <ul className="flex flex-col gap-1 py-2">
            <li className="text-xs md:text-sm">
              <span className="font-semibold">Place:</span> {job.city}
            </li>
            <li className="text-xs md:text-sm">
              <span className="font-semibold">Type Employment:</span> {job.type}
            </li>
            <li className="text-xs md:text-sm">
              <span className="font-semibold">Company Name:</span> {job.company}
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-md md:text-lg font-medium flex items-center gap-3">
            Job Overview <FaStar size={15} className="text-blue-500" />
          </h1>

          <ParsedHTML data={job.description} />
        </div>

        <div className="border-t-[1px] my-5" />
      </div>
    </section>
  );
};

export default JobDetails;
