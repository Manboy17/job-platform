import JobCard from "@/components/shared/JobCard";
import NotYet from "@/components/shared/NotYet";
import { getSavedJobs } from "@/lib/actions/job.action";
import { getUserById, getUserJobs } from "@/lib/actions/user.action";
import { IJob } from "@/lib/database/models/job.model";
import { auth } from "@clerk/nextjs";
import React from "react";

const ProfilePage = async () => {
  const { userId } = auth();

  const user = await getUserById({ userId });
  const jobs = await getUserJobs({ userId: user._id });
  const savedJobs = await getSavedJobs({ clerkId: userId! });

  return (
    <section className="wrapper flex flex-col md:flex-row">
      <div className="md:w-1/2 p-5">
        {jobs?.length ? (
          <>
            <h1 className="text-lg font-medium">Your created jobs</h1>
            <div className="flex flex-col gap-5 mt-3 w-full">
              {jobs.map((job: IJob) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isMainPage={false}
                  userId={user?._id}
                  isSaved={user?.saved.includes(job._id)}
                />
              ))}
            </div>
          </>
        ) : (
          <NotYet
            text="No Created Vacancies Yet!"
            linkText="Create Now"
            route="/list-job"
          />
        )}
      </div>
      <div className="md:w-1/2 p-5">
        {savedJobs.length ? (
          <>
            <h1 className="text-lg font-medium">Your saved jobs</h1>
            <div className="flex flex-col gap-5 mt-3 w-full">
              {savedJobs.map((job: IJob) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isMainPage={false}
                  userId={user?._id}
                  isSaved={user?.saved.includes(job._id)}
                />
              ))}
            </div>
          </>
        ) : (
          <NotYet
            text="No Saved Vacancies Yet!"
            linkText="Main Page"
            route="/"
          />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
