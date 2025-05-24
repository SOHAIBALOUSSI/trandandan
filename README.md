# 🧱 Full App Structure Overview

```bash
ft_transcendence/
├── docker/                     # Docker-related files
│   ├── nginx/                  # Nginx configs (optional for SSR or static)
│   ├── Dockerfile.client       # Frontend Dockerfile
│   ├── Dockerfile.server       # Backend Dockerfile
│   └── docker-compose.yml      # Compose to run everything
│
├── public/                     # Static files served as-is (favicon, fonts, etc.)
│   └── assets/                 # Global images (logo, icons)
│
├── index.html
├── src/
│   ├── client/                 # Frontend (Vite + TS + Tailwind + custom JSX)
│   │   ├── assets/             # Local JSX-imported images
│   │   ├── components/         # UI components (Button, Header, etc.)
│   │   ├── views/              # Pages (Home, SignIn, Game, etc.)
│   │   ├── styles/             # Tailwind + normalize.css + main.css
│   │   ├── main.tsx           # Entry point
│   │   └── jsx-runtime.ts     # Custom JSX runtime
│   │
│   ├── server/                 # Backend (Fastify + TS + SQLite)
│   │   ├── controllers/        # Route handlers (userController.ts, gameController.ts)
│   │   ├── services/           # Business logic (authService.ts, matchService.ts)
│   │   ├── models/             # Database models
│   │   ├── routes/             # Route definitions
│   │   ├── websocket/          # Real-time features (game, chat)
│   │   ├── middleware/         # Auth, validation, error handlers
│   │   ├── database/           # SQLite setup, migrations, seeds
│   │   ├── server.ts           # Main Fastify entry
│   │   └── types/              # Shared server types
│
├── types/                      # Global TypeScript definitions (vite-env.d.ts)
│
├── .env                        # Environment variables (shared)
├── .gitignore
├── tailwind.config.js          # Tailwind setup
├── postcss.config.js           # PostCSS setup
├── tsconfig.json               # TypeScript config (can be base)
├── vite.config.ts              # Vite config
├── package.json                # Dependencies and scripts (can be root or split)
└── README.md
```
