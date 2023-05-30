type User = {
  name: string;
  email: string;
  gender: "m" | "f";
  birthDate: Date | null;
  avatar: string;
};

export interface LoginUser {
  name: string;
  email: string;
}

export default User;
