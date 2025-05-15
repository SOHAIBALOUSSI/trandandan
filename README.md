```bash
ft_transcendence/
├── docker/
│   ├── Dockerfile                 # Frontend Docker container
│   ├── docker-compose.yml         # Optional multi-service setup
│   └── nginx/                     # For production deployment (SSR or static)
│       └── default.conf
│
├── public/                        # Public static files served directly
│   └── favicon.ico
│
├── src/
│   ├── client/                    # Frontend
│   │   ├── assets/                # Static assets (images, fonts)
│   │   ├── components/            # UI elements in JSX
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── game/
│   │   │   ├── chat/
│   │   │   └── user/
│   │   ├── views/                 # Full pages
│   │   ├── handlers/              # View logic or state
│   │   ├── services/              # API, Auth, WebSocket
│   │   ├── styles/                # Tailwind entry CSS
│   │   ├── types/                 # Global types
│   │   ├── utils/                 # Helpers
│   │   ├── App.tsx                # Main component
│   │   ├── main.tsx               # Entry point
│   │   └── index.html             # HTML template
│
│   ├── server/                    # Backend (optional if separate)
│       ├── controllers/
│       ├── models/
│       ├── services/
│       ├── routes/
│       ├── middleware/
│       ├── websocket/
│       ├── database/
│       ├── utils/
│       ├── types/
│       └── server.ts
│
├── dist/                          # Vite output (auto-generated)
├── node_modules/
├── .env
├── .env.example
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

```bash
custom-jsx-app/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── postcss.config.js
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.tsx
│   ├── jsx-runtime.ts
│   └── styles/
│       └── main.css
```
