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
│   │   ├── handlers/         # Frontend handlers (view logic)
│   │   │   ├── GameHandler.ts
│   │   │   ├── UserHandler.ts
│   │   │   ├── ChatHandler.ts
│   │   │   └── TournamentHandler.ts
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
│   ├── server/                  # Backend code
│       ├── controllers/         # Route controllers
│       │   ├── userController.ts
│       │   ├── gameController.ts
│       │   ├── tournamentController.ts
│       │   └── chatController.ts
│       ├── models/              # Data models
│       │   ├── User.ts
│       │   ├── Game.ts
│       │   ├── Tournament.ts
│       │   └── Chat.ts
│       ├── services/            # Business logic
│       │   ├── authService.ts
│       │   ├── gameService.ts
│       │   └── chatService.ts
│       ├── routes/              # API route definitions
│       │   ├── userRoutes.ts
│       │   ├── gameRoutes.ts
│       │   ├── tournamentRoutes.ts
│       │   └── chatRoutes.ts
│       ├── middleware/          # Express middleware
│       ├── websocket/           # WebSocket handlers
│       ├── database/            # Database configuration
│       │   ├── migrations/      # SQLite migrations
│       │   ├── seeds/           # Seed data
│       │   └── connection.ts    # Database connection setup
│       ├── utils/               # Utility functions
│       ├── types/               # TypeScript type definitions
│       └── server.ts            # Main server entry point
│
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