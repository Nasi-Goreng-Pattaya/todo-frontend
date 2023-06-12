import { Buffer } from "buffer";

type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  gender?: "M" | "F";
  birthDate?: Date | null;
  avatar?: Buffer | null;
};

export interface LoginRegisterUser {
  name?: string;
  email: string;
  password: string;
}

export interface updateUserPayload {
  userId: string;
  updatedUser: Partial<User>;
}

export default User;
