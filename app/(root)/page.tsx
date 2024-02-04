import Filters from "@/components/shared/Filters";
import JobCard from "@/components/shared/JobCard";
import ProductDetails from "@/components/shared/ProductDetails";
import Search from "@/components/shared/Search";
import { getJobs } from "@/lib/actions/job.action";
import { getUserById } from "@/lib/actions/user.action";
import { IJob } from "@/lib/database/models/job.model";
import { auth } from "@clerk/nextjs";
import React from "react";

const MainPage = async () => {
  const jobs: IJob[] = await getJobs();
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <section className="bg-blue-600 w-full py-4">
        <div className="wrapper">
          <h1 className="text-white text-2xl tracking-wide md:text-3xl lg:text-4xl">
            Find your dream job
          </h1>
          <p className="text-white text-xs pt-3 tracking-wide md:text-sm">
            Looking for jobs? Browse our latest job opening to view
          </p>
        </div>
      </section>

      <section className="wrapper py-5">
        <div className="flex flex-col items-center w-full justify-between gap-6 lg:flex-row">
          <Search />
          <Filters />
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="wrapper py-5 flex">
          <div className="w-1/3">
            <span className="text-xs text-gray-500">
              {jobs.length} Job Posting Available
            </span>
            <div className="flex flex-col gap-5 mt-3">
              {jobs.map((job: IJob) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isMainPage
                  userId={JSON.stringify(mongoUser?._id)}
                  isSaved={mongoUser?.saved.includes(job._id)}
                />
              ))}
            </div>
          </div>
          <div className="w-2/3">
            <ProductDetails />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
