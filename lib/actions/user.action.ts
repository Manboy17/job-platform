"use server";

import {
  CreateUserParams,
  GetUserById,
  GetUserJobsParams,
  ToggleSaveJobsParams,
  UpdateUserParams,
} from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Job from "../database/models/job.model";
import { revalidatePath } from "next/cache";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, user } = params;

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser({ clerkId }: { clerkId: string }) {
  try {
    await connectToDatabase();

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    await Job.deleteMany({ creator: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(params: GetUserById) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserJobs(params: GetUserJobsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const jobs = await Job.find({ creator: userId });

    if (!jobs) {
      throw new Error("Jobs not found");
    }

    return jobs;
  } catch (error) {
    console.log(error);
  }
}

export async function toggleSaveJobs(params: ToggleSaveJobsParams) {
  try {
    await connectToDatabase();

    const { userId, jobId, path } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const isJobSaved = user.saved.includes(jobId);

    if (isJobSaved) {
      await User.findOneAndUpdate(
        { clerkId: userId },
        { $pull: { saved: jobId } },
        { new: true }
      );
    } else {
      await User.findOneAndUpdate(
        { clerkId: userId },
        { $push: { saved: jobId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
