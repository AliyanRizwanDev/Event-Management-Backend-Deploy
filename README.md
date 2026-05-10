# Event-Management-Backend-Deploy

## Setup

1. Copy `.env.example` to `.env` and fill values (set `MONGO_URI` and `SECRET`).
2. Install dependencies:

```bash
npm install
```

3. Seed the database (optional, creates demo users and events):

```bash
npm run seed
```

4. Start the server in development:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

## Notes
- The server requires Node 20+ (see package.json `engines`).
- The code uses environment variables defined in `.env`.
