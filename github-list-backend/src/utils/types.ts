// types.ts file we will use to link our fields in the service file.

export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
}

export type UpdateUserParams = {
  username: string;
  email: string;
  password: string;
}
