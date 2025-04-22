.
├── 📁 client/                      # Frontend app (TypeScript + Tailwind CSS)
│   ├── 📁 public/                  # Static assets (favicon, images, etc.)
│   ├── 📁 src/
│   │   ├── 📁 assets/             # Images, fonts, etc.
│   │   ├── 📁 components/         # Reusable React components
│   │   ├── 📁 pages/              # SPA route views (Home, Game, Profile, etc.)
│   │   ├── 📁 styles/             # Tailwind CSS config and custom CSS
│   │   ├── 📁 hooks/              # Custom hooks
│   │   ├── 📁 utils/              # Utility functions
│   │   └── 📄 main.tsx           # App entry point
│   ├── 📄 index.html              # Main HTML file
│   └── 📄 tailwind.config.js      # Tailwind configuration

├── 📁 server/                     # Backend app (Fastify)
│   ├── 📁 api/                    # Route definitions
│   │   ├── 📄 auth.ts            # Authentication routes
│   │   ├── 📄 user.ts            # User-related routes
│   │   ├── 📄 game.ts            # Game logic routes
│   │   └── 📄 chat.ts            # Chat routes
│   ├── 📁 controllers/           # Route handlers
│   ├── 📁 middlewares/          # Auth, validation, etc.
│   ├── 📁 services/             # Business logic (e.g., matchmaking, AI, chat)
│   ├── 📁 models/               # DB models (if using Prisma or raw SQL)
│   ├── 📁 utils/                # Helpers like password hashing, JWT, etc.
│   ├── 📄 index.ts              # Fastify entry point
│   └── 📄 db.ts                 # SQLite DB connection setup

├── 📁 docker/                    # Docker-related files
│   ├── 📄 Dockerfile
│   ├── 📄 docker-compose.yml
│   └── 📄 .dockerignore

├── 📁 scripts/                   # Custom scripts (e.g., seed db, reset tournaments)
│   └── 📄 seed.ts

├── 📄 .env                       # Environment variables (ignored in git)
├── 📄 .gitignore
├── 📄 README.md
└── 📄 package.json               # Root package.json for shared scripts/configs
