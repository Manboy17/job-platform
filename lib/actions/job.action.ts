"use server";

import { CreateJobParams } from "@/types";
import { connectToDatabase } from "../database";
import Job from "../database/models/job.model";
import { revalidatePath } from "next/cache";

const populateJob = (query: any) => {
  return query.populate({
    path: "creator",
    select: "_id firstName lastName email",
  });
};

export async function createJob({ userId, job, path }: CreateJobParams) {
  try {
    await connectToDatabase();

    const newJob = await Job.create({ ...job, creator: userId });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newJob));
  } catch (error) {
    console.log(error);
  }
}

export async function getJobs() {
  try {
    await connectToDatabase();

    const jobs = await populateJob(Job.find({}));

    if (!jobs) {
      throw new Error("No jobs found");
    }

    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.log(error);
  }
}
