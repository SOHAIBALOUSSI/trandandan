export type UserProfile = {
  id: number;
  username: string;
  email: string;
  gender: string | null;
  avatar_url: string;
  status: string;
  solde: number;
  rank: number;
  level: number;
  created_at: string;
  matches_played: number;
  matches_won: number;
  matches_lost: number;
};

export type UserRegister = {
  username: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

export type UserRank = {
  rank: number;
  name: string;
  level: string;
  avatarUrl: string;
};

export type Activity =
  | { type: "win"; user: string; targetUser: string }
  | { type: "loss"; user: string; targetUser: string }
  | { type: "tournament"; user: string; tournament: string }
  | { type: "delete"; user: string; message?: string };
