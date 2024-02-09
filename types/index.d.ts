export type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
};

export type GetJobsParams = {
  search: string;
  filter: object;
};

export type UpdateUserParams = {
  clerkId: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
};

export type CreateJobParams = {
  userId: string;
  job: {
    position: string;
    shortDesc: string;
    description: string;
    city: string;
    type: string;
    industry: string;
    experience: number;
    company: string;
  };
  path: string;
};

export type GetUserByIdParams = {
  userId: string | null;
};

export type GetUserJobsParams = {
  userId: string | null;
};

export type ToggleSaveJobsParams = {
  userId: string;
  jobId: string;
  path: string;
};

export type GetSavedJobsParams = {
  clerkId: string;
};

export type GetJobByIdParams = {
  jobId: string;
};

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
