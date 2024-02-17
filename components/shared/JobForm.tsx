"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { JobSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createJob, editJob } from "@/lib/actions/job.action";
import { usePathname, useRouter } from "next/navigation";
import { jobDefaultValues } from "@/constants";
import TipTap from "./TipTap";
import { IJob } from "@/lib/database/models/job.model";

interface JobFormProps {
  type: "Create" | "Edit";
  userId: string;
  jobDetails?: any;
}

const JobForm = ({ type, userId, jobDetails }: JobFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const initialValues =
    jobDetails && type === "Edit" ? jobDetails : jobDefaultValues;

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof JobSchema>) {
    setIsLoading(true);

    try {
      if (type === "Create") {
        try {
          const newJob: IJob = await createJob({
            userId: JSON.parse(userId),
            job: { ...values },
            path: pathname,
          });
          if (newJob) {
            form.reset();
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        }
      } else if (type === "Edit") {
        const editedJob = await editJob({
          jobId: jobDetails._id,
          job: { ...values },
          path: pathname,
        });

        if (editedJob) {
          form.reset();
          router.push(`/job/${jobDetails._id}`);
        }
        try {
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-5">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Job Position</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="Enter position..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDesc"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="Short description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter the city</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="City..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter the type</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="Type..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter the industry</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="Industry..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter the minimal experience in years</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    type="number"
                    placeholder="Experience..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter your company</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="Company..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Enter the description</FormLabel>
              <FormControl>
                <TipTap onChange={field.onChange} description={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-5 bg-blue-700" variant="default">
          {isLoading ? "Loading" : type === "Create" ? "Create" : "Edit"}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
