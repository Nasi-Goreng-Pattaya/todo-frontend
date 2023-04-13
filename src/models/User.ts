type User = {
  name: string;
  email: string;
  gender: "m" | "f";
  birthDate: Date | null;
  avatar: string;
};

export default User;
