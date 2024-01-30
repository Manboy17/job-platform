"use server";

import { CreateJobParams } from "@/types";
import { connectToDatabase } from "../database";
import Job from "../database/models/job.model";
import { revalidatePath } from "next/cache";

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
