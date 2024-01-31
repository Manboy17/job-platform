import JobForm from "@/components/shared/JobForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const ListJob = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <section className="wrapper">
      <h1 className="text-left pt-10 text-xl font-normal">Create Vacancy</h1>

      <div className="pt-10">
        <JobForm type="Create" userId={JSON.stringify(mongoUser._id)} />
      </div>
    </section>
  );
};

export default ListJob;
