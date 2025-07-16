export type UserProfile = {
  id: number;
  userId: number;
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
  | { type: "tournament"; user: string; tournament: string };

export type TwoFAMethod = {
  type: "app" | "email";
  enabled: 1 | 0;
  is_primary: 1 | 0;
};

export type Notification = {
  notification_id: number;
  type:
    | "FRIEND_REQUEST_SENT"
    | "FRIEND_REQUEST_ACCEPTED"
    | "FRIEND_REQUEST_REJECTED"
    | "MESSAGE_RECEIVED"
    | "INVITE_SENT";
  recipient_id?: number;
  sender_id?: number;
  actualMessage?: string;
  roomId?: number;
  senderId?: number;
  receiverId?: number;
  notifications_count?: number;
};

export type MessageSent = {
  type: "MESSAGE_SENT";
  sender_id: number;
  recipient_id: number;
  message_id: number;
  content: string;
};

export type MessageRead = {
  type: "MESSAGE_READ";
  message_id: number;
};

export interface GameStateLocal {
  paddleLeftY: number;
  paddelRightY: number;
  ballX: number;
  ballY: number;
  keypressd: string[];
  rightPlayerScore: number;
  leftPlayerScore: number;
  flagX: boolean;
  flagY: boolean;
  ballSpeed: number;
  count: number;
}

export type GameActivity = {
  enemyId: string;
  userId: string;
  gameEndResult: "Won" | "Lost";
};
