```bash
ft_transcendence/
├── docker/                      # Docker configuration files
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx/                   # Nginx config for production
├── src/                         # Source code
│   ├── client/                  # Frontend code
│   │   ├── assets/              # Static assets (images, fonts)
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # Shared components (buttons, inputs)
│   │   │   ├── layout/          # Layout components (header, footer)
│   │   │   ├── game/            # Game-specific components
│   │   │   ├── chat/            # Chat-specific components
│   │   │   └── user/            # User-related components
│   │   ├── views/               # Page components
│   │   │   ├── Home.ts
│   │   │   ├── Game.ts
│   │   │   ├── Tournament.ts
│   │   │   ├── Profile.ts
│   │   │   └── Chat.ts
│   │   ├── controllers/         # Frontend controllers
│   │   │   ├── GameController.ts
│   │   │   ├── UserController.ts
│   │   │   ├── ChatController.ts
│   │   │   └── TournamentController.ts
│   │   ├── services/            # Frontend services
│   │   │   ├── ApiService.ts    # API communication
│   │   │   ├── AuthService.ts   # Authentication
│   │   │   ├── WebSocketService.ts # Real-time communication
│   │   │   └── RouterService.ts # Client-side routing
│   │   ├── utils/               # Utility functions
│   │   ├── types/               # TypeScript type definitions
│   │   ├── styles/              # CSS/Tailwind styles
│   │   └── index.ts             # Main entry point
│   │
│   ├── server/                 # Backend code
│       ├── auth-service/
│       │   ├── src
│       │   │   ├── controllers/              # Route controllers
│       │   │   │   └── auth.controller.js
│       │   │   ├── migrations/               # SQLite migrations
│       │   │   │   └── createUserTable.js
│       │   │   ├── models/                   # Data models
│       │   │   │   └── auth.model.js
│       │   │   ├── plugins/                  # Custom plugins
│       │   │   │   ├── jwt-plugin.js
│       │   │   │   └── sqlite-plugin.js
│       │   │   ├── routes/                   # API route definitions
│       │   │   │   └── auth.routes.js
│       │   │   ├── schemas/                  # Validation JSON Schemas
│       │   │   │   └── auth.schema.js
│       │   │   └── index.js
│       │   ├── .dockerignore
│       │   ├── Dockerfile
│       │   ├── package-lock.json
│       │   └── package.json
│       ├── docker-compose.yml
│       └── dockerfileGenerator.sh
├── public/                      # Public static files
├── dist/                        # Compiled output
├── node_modules/                # Dependencies
├── .env                         # Environment variables
├── .env.example                 # Example environment variables
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── webpack.config.js            # Webpack configuration
└── README.md                    # Project documentation
```
