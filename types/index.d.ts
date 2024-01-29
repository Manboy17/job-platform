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
