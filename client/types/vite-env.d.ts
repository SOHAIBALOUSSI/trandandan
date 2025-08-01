/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_AUTH_SERVICE: string
  readonly VITE_PROFILE_SERVICE: string
  readonly VITE_FRIENDS_SERVICE: string
  readonly VITE_GAME_SERVICE: string
  readonly VITE_NOTIFICATIONS_SERVICE: string
  readonly VITE_CHAT_SERVICE: string
  readonly VITE_DASHBOARD_SERVICE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
