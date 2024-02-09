"use server";

import {
  CreateJobParams,
  GetJobByIdParams,
  GetJobsParams,
  GetSavedJobsParams,
} from "@/types";
import { connectToDatabase } from "../database";
import Job from "../database/models/job.model";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { FilterQuery } from "mongoose";

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

export async function getJobs(params: GetJobsParams) {
  try {
    await connectToDatabase();

    const { search, filter } = params;

    const query: FilterQuery<typeof Job> = {};

    if (search) {
      query.$or = [
        {
          position: { $regex: new RegExp(search, "i") },
        },
        {
          shortDesc: { $regex: new RegExp(search, "i") },
        },
        {
          description: { $regex: new RegExp(search, "i") },
        },
        {
          type: { $regex: new RegExp(search, "i") },
        },
        {
          industry: { $regex: new RegExp(search, "i") },
        },
        {
          city: { $regex: new RegExp(search, "i") },
        },
      ];
    }

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "experience") {
            query[key] = Number(value);
          } else {
            query[key] = { $regex: new RegExp(value, "i") };
          }
        }
      });
    }

    const jobs = await populateJob(Job.find(query));

    if (!jobs) {
      throw new Error("No jobs found");
    }

    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.log(error);
  }
}

export async function getFilters() {
  try {
    await connectToDatabase();

    const cities = await Job.find().distinct("city");
    const types = await Job.find().distinct("type");
    const industry = await Job.find().distinct("industry");
    const experience = await Job.find().distinct("experience");

    return {
      cities,
      types,
      industry,
      experience,
    };
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

export async function getJobById(params: GetJobByIdParams) {
  try {
    await connectToDatabase();
    const { jobId } = params;

    const job = await populateJob(Job.findById(jobId));

    if (!job) {
      throw new Error("Job not found");
    }

    return JSON.parse(JSON.stringify(job));
  } catch (error) {
    console.log(error);
  }
}
