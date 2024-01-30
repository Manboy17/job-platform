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
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createJob } from "@/lib/actions/job.action";
import { usePathname, useRouter } from "next/navigation";
import { jobDefaultValues } from "@/constants";

interface JobFormProps {
  type: "Create" | "Edit";
  userId: string;
}

const JobForm = ({ type, userId }: JobFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: jobDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof JobSchema>) {
    setIsLoading(true);

    try {
      if (type === "Create") {
        const newJob = await createJob({
          userId: JSON.parse(userId),
          job: { ...values },
          path: pathname,
        });
        if (newJob) {
          form.reset();
          router.push("/");
        }
      } else if (type === "Edit") {
        // logic here
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter the experience</FormLabel>
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    type="number"
                    placeholder="Experience..."
                  />
                </FormControl>
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
                <Textarea
                  placeholder="Description..."
                  className="textarea"
                  rows={10}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="mt-5 bg-blue-700" variant="default">
          {isLoading ? "Loading" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
