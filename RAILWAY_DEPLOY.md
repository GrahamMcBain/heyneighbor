# 🚂 One-Click Railway Deployment

## Deploy CMS to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/directus)

### Quick Setup:

1. **Click the Railway button above**
2. **Set these environment variables**:
   ```
   ADMIN_EMAIL=grahammcbain@gmail.com
   ADMIN_PASSWORD=YourSecurePassword123!
   KEY=random-32-character-key
   SECRET=random-64-character-secret
   CORS_ORIGIN=https://heyneighbor.vercel.app
   ```

3. **Once deployed, get your Railway URL** (something like `https://directus-production-xxxx.up.railway.app`)

4. **Update Vercel environment variables**:
   - Go to your Vercel project settings
   - Update: `NEXT_PUBLIC_DIRECTUS_URL=https://your-railway-url.railway.app`
   - Redeploy

## Alternative: Manual Railway Deployment

If the button doesn't work:

1. Go to https://railway.app
2. Click "New Project" 
3. Choose "Deploy from GitHub repo"
4. Select this repo: `GrahamMcBain/heyneighbor`
5. Railway will auto-detect the `railway.toml` file
6. Add a PostgreSQL database service
7. Deploy!

## Post-Deployment Setup

After Railway deployment, run these scripts against your live CMS:

```bash
# Update script URLs to your live Railway URL
export DIRECTUS_URL="https://your-app.railway.app"

# Run setup scripts
./scripts/setup-directus-auto.sh
./scripts/setup-permissions.sh  
./scripts/create-authors.sh
./scripts/setup-public-permissions.sh
```

## Final Step

Update your Vercel environment:
```
NEXT_PUBLIC_DIRECTUS_URL=https://your-railway-url.railway.app
```

Then your regional blog will be fully live! 🎉
