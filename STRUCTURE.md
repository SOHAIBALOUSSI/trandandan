```
├── public/                                 # Public static assets served by the frontend
│   └── assets/                             # Public images, logos, and icons
│
├── docker/                                 # Docker-related files
│   └── Dockerfile.client                   # Dockerfile to build the client image
│
├── index.html                              # Root HTML for Vite app
│
├── src/                                    # Source code root (frontend + backend)
│
│   ├── client/                             # Frontend (TS + Vite + Tailwind)
│   │
│   │   ├── assets/                         # Static media used inside components (images/icons)
│   │
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── auth/                       # Signin, Signup, OTP, etc.
│   │   │   ├── common/                     # InputField, Buttons, Loader, etc.
│   │   │   ├── game/                       # Game feature-specific UI
│   │   │   ├── home/                       # Homepage UI
│   │   │   └── layout/                     # Layout components (NavBar, TopBar, Footer, etc.)
│   │
│   │   ├── handlers/                       # Event handlers for forms & user actions
│   │   │   ├── change-email.ts
│   │   │   ├── change-password.ts
│   │   │   ├── delete-account.ts
│   │   │   ├── lost-password.ts
│   │   │   ├── logout.ts
│   │   │   ├── otp-input.ts
│   │   │   ├── reset-password.ts
│   │   │   ├── signin.ts
│   │   │   ├── signup.ts
│   │   │   └── verify-update-credentials.ts
│   │
│   │   ├── router/
│   │   │   └── index.ts                   # Router configuration
│   │
│   │   ├── services/                      # API requests
│   │   │   ├── auth-fetch.ts
│   │   │   ├── check-2fa.ts
│   │   │   ├── disable-2fa.ts
│   │   │   ├── enable-2fa.ts
│   │   │   ├── get-users.ts
│   │   │   ├── set-primary-method.ts
│   │   │   ├── setup-2fa.ts
│   │   │   ├── update-username.ts
│   │   │   ├── verify-login.ts
│   │   │   └── verify-otp-code.ts
│   │
│   │   ├── styles/                        # Styling system
│   │   │   ├── all.min.css                # FontAwesome
│   │   │   ├── fontSizes.ts               # Tailwind font token config
│   │   │   ├── main.css                   # Global styles
│   │   │   ├── normalize.css              # CSS reset
│   │   │   └── styles.ts                  # Tailwind constants
│   │
│   │   ├── utils/                         # Client-side utility helpers
│   │   │   ├── display-toast.ts
│   │   │   ├── response-messages.ts
│   │   │   └── user-store.ts             
│   │
│   │   ├── views/                         # Top-level route views/pages
│   │   │   ├── Blocked.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── DeleteAccount.tsx
│   │   │   ├── Friends.tsx
│   │   │   ├── Game.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── LostPassword.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   ├── Security.tsx
│   │   │   ├── Signin.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── UpdateCredentialsEmail.tsx
│   │   │   ├── UpdateCredentialsPassword.tsx
│   │   │   ├── VerifyLogin.tsx
│   │   │   ├── VerifyUpdateCredentials.tsx
│   │   │   └── Welcome.tsx
│   │
│   │   ├── webfonts/                      # Custom fonts (woff/woff2)
│   │   ├── main.tsx                       # App entry point
│   │   └── jsx-runtime.ts                 # Custom JSX runtime
│
│   ├── server/                            # Backend (Microservices Architecture)
│   │
│   │   ├── auth-service/                  # Auth microservice
│   │   ├── chat-service/                  # Realtime chat service
│   │   ├── notifications-service/         # Notification queue or push system
│   │   ├── profile-service/               # User profile management
│   │   ├── relationships-service/         # Friends/Add/block system
│   │   └── redis/                         # Redis configuration, caching
│
│   ├── docs/                              # Backend documentation
│   │   ├── auth-service.md
│   │   ├── notifications-service.md
│   │   ├── profile-service.md
│   │   └── relationships-service.md
│
│   ├── types/                             # global types (client)
│   │   ├── images.d.ts
│   │   ├── types.ts
│   │   └── vite-env.d.ts
│
├── .env                                  # Project-wide environment variables
├── .gitignore                            # Ignore node_modules, .env, etc.
├── docker-compose.yml                    # Compose all services
├── Makefile                              # For automation
├── package.json                          # Project scripts and dependencies
├── tsconfig.json                         # TypeScript config
├── vite.config.ts                        # Vite frontend build config
├── postcss.config.js                     # Tailwind/PostCSS plugins config
├── tailwind.config.js                    # Tailwind config
├── README.md                             # Main project documentation
├── STRUCTURE.md                          # Description of folder and architecture
```