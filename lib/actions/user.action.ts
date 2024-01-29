"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}
