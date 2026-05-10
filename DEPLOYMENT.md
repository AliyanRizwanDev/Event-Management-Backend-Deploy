# Railway Deployment Guide

## Quick Setup

### Step 1: Push to GitHub

```bash
cd c:\Users\hp\Desktop\Projects\My\Event-Management-Backend-Deploy
git add .
git commit -m "chore(deploy): add railway config"
git push origin main
```

### Step 2: Deploy on Railway

1. Go to https://railway.app and sign up (free tier)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your Event-Management-Backend-Deploy repo
4. Railway auto-detects `railway.json` and Node.js project

### Step 3: Set Environment Variables

In Railway dashboard:

- Go to **Variables** tab
- Add each variable from `.env.example`:
  - `PORT` = 8050
  - `MONGO_URI` = your MongoDB Atlas connection string (keep existing)
  - `SECRET` = generate a strong random string: `openssl rand -base64 32`
  - `MAILTRAP_*` = leave empty if no email needed (backend handles gracefully)

Example `.env` format for Railway:

```
PORT=8050
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
SECRET=your_generated_secret_here
```

### Step 4: Deploy

- Railway auto-deploys on push
- View live URL in Railway dashboard (e.g., `https://your-app-production.railway.app`)
- Backend will be accessible at that URL + API routes (e.g., `/api/users/login`)

### Important Security Notes

⚠️ **Never commit `.env` with real credentials to GitHub**

- Use `.env.example` as template
- Railway uses Variables tab for secrets (encrypted at rest)
- Regenerate `SECRET` for production

## Testing Live Backend

```bash
# Test health check
curl https://your-railway-url/health

# Test login (from frontend)
curl -X POST https://your-railway-url/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Password123!"}'
```

## Frontend Setup (Vercel)

Once backend is live on Railway:

1. Update frontend `env.js` with Railway backend URL
2. Deploy frontend to Vercel (free tier)
3. Vercel auto-builds from GitHub

## Troubleshooting

- **"Module not found" errors**: Railway auto-runs `npm install`
- **Database connection fails**: Double-check `MONGO_URI` in Variables
- **Port conflicts**: Railway assigns PORT dynamically; use `process.env.PORT`
- **Logs**: View in Railway dashboard → "Deployments" → "Logs" tab
