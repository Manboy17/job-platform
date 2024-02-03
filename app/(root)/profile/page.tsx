import JobCard from "@/components/shared/JobCard";
import NotYet from "@/components/shared/NotYet";
import { getUserById, getUserJobs } from "@/lib/actions/user.action";
import { IJob } from "@/lib/database/models/job.model";
import { auth } from "@clerk/nextjs";
import React from "react";

const ProfilePage = async () => {
  const { userId } = auth();
  const user = await getUserById({ userId });
  const jobs = await getUserJobs({ userId: user._id });
  return (
    <section className="wrapper flex">
      <div className="w-1/2 p-5">
        {jobs?.length ? (
          <>
            <h1 className="text-lg font-medium">Your created jobs</h1>
            <div className="flex flex-col gap-5 mt-3 max-h-[1100px] overflow-auto scrollbar-hide">
              {jobs.map((job: IJob) => (
                <JobCard key={job._id} job={job} isMainPage={false} />
              ))}
            </div>
          </>
        ) : (
          <NotYet
            text="Not Created Vacancies Yet!"
            linkText="Create Now"
            route="/list-job"
          />
        )}
      </div>
      <div className="w-1/2 p-5">
        <h1 className="text-lg font-medium">Your saved jobs</h1>
      </div>
    </section>
  );
};

export default ProfilePage;
