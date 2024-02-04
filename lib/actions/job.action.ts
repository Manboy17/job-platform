"use server";

import { CreateJobParams, GetSavedJobsParams } from "@/types";
import { connectToDatabase } from "../database";
import Job from "../database/models/job.model";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";

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

export async function getSavedJobs(params: GetSavedJobsParams) {
  try {
    await connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedJobs = user.saved;

    return JSON.parse(JSON.stringify(savedJobs));
  } catch (error) {
    console.log(error);
  }
}
