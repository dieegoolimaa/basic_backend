# Render Deployment Instructions

## Deploy on Render.com

### 1. Create Web Service
- Go to https://render.com
- Click "New +" → "Web Service"
- Connect your GitHub repository: `dieegoolimaa/basic_backend`

### 2. Configuration

**Basic Settings:**
- Name: `basic-studio-api` (or your preferred name)
- Region: Choose closest to your users
- Branch: `main`
- Root Directory: (leave empty)
- Runtime: `Node`

**Build & Deploy:**
- Build Command: `npm install && npm run build`
- Start Command: `npm run start:prod`

**Environment Variables:**
Click "Advanced" and add these environment variables:

```
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-a-secure-random-string>
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 3. MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com
2. Create a free cluster (M0 Sandbox)
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0` (for Render)
5. Get connection string and update `MONGODB_URI`

### 4. Deploy

- Click "Create Web Service"
- Wait for deployment to complete
- Your API will be available at: `https://your-service-name.onrender.com/api`

### Important Notes:

- Free tier on Render spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to paid plan for production use
- Update CORS settings in main.ts with your frontend URL

### CORS Configuration

After deployment, update `src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:4200',
    'https://your-frontend-url.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
});
```
