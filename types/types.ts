export type UserProfile = {
  username: string;
  email: string;
  avatarUrl: string;
  gender?: string;
  status: string;
  solde: number;
  rank: number;
  level: number;
  joinDate: string;
};

export type UserRegister = {
  username: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
};
