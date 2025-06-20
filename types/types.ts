export type UserProfile = {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  gender?: string;
  status: string;
  solde: number;
  rank: number;
  level: number;
  joinDate: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
};

export type UserRegister = {
  username: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
};
