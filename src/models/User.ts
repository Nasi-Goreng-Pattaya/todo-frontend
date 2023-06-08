type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  gender?: "M" | "F";
  birthDate?: Date | null;
  avatar?: string;
};

export interface LoginRegisterUser {
  name?: string;
  email: string;
  password: string;
}

export default User;
