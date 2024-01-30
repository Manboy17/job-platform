export type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
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
