# 🏓 Trandenden App – Full Stack Structure & Overview

## Overview

**Trandenden** is a modern, modular full-stack application for a social gaming platform.  
It features a real-time Pong game, chat, tournaments, notifications, user profiles, and a live dashboard, all built with a microservices backend and a Vite/Tailwind/TypeScript frontend.

- **Frontend:** SPA using Vite, TypeScript, TailwindCSS, and modular components.
- **Backend:** Microservices (Node.js/Express or NestJS style), each responsible for a domain (auth, chat, notifications, etc.), communicating via REST/WebSocket and Redis.
- **DevOps:** Dockerized, with docker-compose for orchestration, and environment variables for configuration.

---

## File & Folder Structure

```
├── client/                                 # Frontend (SPA: TypeScript + Vite + Tailwind)
│
│   ├── public/                             # Static assets served directly (images, icons, etc.)
│   │   └── assets/                         # Images, logos, and icons for the frontend
│   ├── src/                                # Source files for the frontend
│   │   ├── assets/                         # App-specific images, icons, etc.
│   │   ├── components/                     # Reusable UI components (buttons, navbars, etc.)
│   │   ├── handlers/                       # Event handlers for forms & user actions
│   │   ├── pages/                          # Top-level route views/pages (Home, Profile, Game, etc.)
│   │   ├── router/                         # SPA router configuration and navigation
│   │   │   └── index.ts
│   │   ├── services/                       # API requests and business logic (fetch, WebSocket, etc.)
│   │   ├── styles/                         # Styling system (Tailwind, CSS, constants)
│   │   │   ├── all.min.css                 # FontAwesome or other icon fonts
│   │   │   ├── fontSizes.ts                # Tailwind font token config
│   │   │   ├── main.css                    # Global styles
│   │   │   ├── normalize.css               # CSS reset
│   │   │   └── styles.ts                   # Tailwind constants
│   │   ├── utils/                          # Client-side utility helpers (toasts, stores, etc.)
│   │   ├── webfonts/                       # Custom fonts (woff/woff2)
│   │   ├── main.tsx                        # App entry point
│   │   └── jsx-runtime.ts                  # Custom JSX runtime (if used)
│   ├── types/                              # Global types/interfaces for the client
│   │   ├── images.d.ts
│   │   ├── types.ts
│   │   └── vite-env.d.ts
│   ├── .env                                # Environment variables for the frontend
│   ├── Dockerfile                          # Dockerfile to build the client image
│   ├── index.html                          # Main HTML entry file
│   ├── package-lock.json                   # NPM lockfile
│   ├── package.json                        # Project scripts and dependencies
│   ├── postcss.config.js                   # Tailwind/PostCSS plugins config
│   ├── tailwind.config.js                  # Tailwind config
│   ├── tsconfig.json                       # TypeScript config
│   └── vite.config.ts                      # Vite frontend build config
│
├── server/                                 # Backend (Microservices Architecture)
│
│   ├── auth-service/                       # Auth microservice (login, registration, 2FA)
│   ├── chat-service/                       # Realtime chat service (WebSocket)
│   ├── dashboard-service/                  # Realtime dashboard service (WebSocket)
│   ├── game-service/                       # Game logic service (independent)
│   ├── notifications-service/              # Notification queue or push system
│   ├── profile-service/                    # User profile management
│   ├── relationships-service/              # Friends/Add/block system
│   ├── redis/                              # Redis configuration, caching
│   ├── docs/                               # Backend documentation (API, services)
│   │   ├── auth-service.md
│   │   ├── chat-service.md
│   │   ├── notifications-service.md
│   │   ├── profile-service.md
│   │   └── relationships-service.md
│   └── .env                                # Environment variables for the backend
│
├── .gitignore                              # Ignore node_modules, .env, etc.
├── docker-compose.yml                      # Compose all services (backend & frontend)
```

---

## Explanation of Key Folders/Files

- **client/public/**: Static files served as-is. Place images, icons, and other assets here.
- **client/src/assets/**: App-specific images and icons.
- **client/src/components/**: Reusable UI components (buttons, navbars, cards, etc.).
- **client/src/handlers/**: JS/TS files for handling user actions and form events.
- **client/src/pages/**: Top-level route views/pages (e.g., Home, Profile, Game).
- **client/src/router/**: SPA router logic and navigation helpers.
- **client/src/services/**: API calls, WebSocket logic, and business logic for the frontend.
- **client/src/styles/**: Tailwind config, global CSS, and style constants.
- **client/src/utils/**: Utility functions (toasts, stores, helpers).
- **client/types/**: TypeScript types/interfaces for the client.
- **client/.env**: Frontend environment variables (e.g., VITE_BACKEND_URL).
- **client/Dockerfile**: Dockerfile for building the frontend image.
- **client/index.html**: Main HTML entry point for the SPA.
- **client/package.json**: NPM scripts and dependencies for the frontend.
- **client/vite.config.ts**: Vite configuration for frontend build/dev server.

- **server/auth-service/**: Handles authentication, registration, and 2FA.
- **server/chat-service/**: Real-time chat via WebSocket.
- **server/dashboard-service/**: Real-time dashboard updates via WebSocket.
- **server/game-service/**: Game logic and match management.
- **server/notifications-service/**: Notification delivery and queueing.
- **server/profile-service/**: User profile CRUD and avatar management.
- **server/relationships-service/**: Friends, blocks, and relationship logic.
- **server/redis/**: Redis configuration and scripts for caching/pubsub.
- **server/docs/**: Markdown documentation for backend APIs and services.
- **server/.env**: Backend environment variables (e.g., DB credentials, secrets).

- **docker-compose.yml**: Orchestrates all services (frontend, backend, Redis, etc.) for local/dev deployment.
- **.gitignore**: Ignore files/folders for git (node_modules, .env, etc.).

---

## How to Use

1. **Clone the repository**
2. **Configure environment variables** in `client/.env` and `server/.env`
3. **Run with Docker Compose**:
   ```sh
   make up
   ```
4. **Access the app** at [http://localhost:8080](http://localhost:8080)

---

**This structure is modular, scalable, and easy to navigate for both frontend and backend development.**
