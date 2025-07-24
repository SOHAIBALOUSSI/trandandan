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

export type UserHistory = {
  id: number;
  user_name: string;
  enemy_id: number;
  user_id: number;
  left_player_score: number; // my score
  right_player_score: number; // my enemy's score
  game_duration: number;
  game_end_result: "Won" | "Lost";
  left_player_ball_hit: number;
  right_player_ball_hit: number;
};

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
  notifications_count?: number;
  last_notification_at?: string;
  notification_ids?: number[];
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

export type GameActivity = {
  enemyId: string;
  userId: string;
  gameEndResult: "WIN" | "LOSE";
};
