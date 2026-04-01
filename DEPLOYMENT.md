# 🚀 Deployment Guide

## Part 1: Deploy Next.js Frontend to Vercel

### Quick Deploy
1. **Connect GitHub to Vercel**:
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo: `GrahamMcBain/heyneighbor`

2. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_MEETING_URL=https://calendly.com/heyneighbor/weekly-call
   NEXT_PUBLIC_CHAPTER_START_URL=https://forms.gle/your-form-id
   NEXT_PUBLIC_WHATSAPP_URL=https://chat.whatsapp.com/your-group
   NEXT_PUBLIC_FIND_URL=https://heyneighbor.org/find
   NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-url.com
   ```

3. **Deploy**: Vercel will automatically build and deploy

## Part 2: Deploy Directus CMS

### Option A: Railway (Recommended - Easy)

1. **Go to Railway.app**:
   - Sign up at https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Deploy Directus**:
   - Choose "Deploy Directus" template
   - Or upload our `infra/directus/docker-compose.yml`

3. **Configure Environment Variables**:
   ```
   DATABASE_URL=postgresql://user:password@host:port/db
   KEY=your-directus-key-32-chars
   SECRET=your-directus-secret-64-chars
   ADMIN_EMAIL=grahammcbain@gmail.com
   ADMIN_PASSWORD=your-secure-password
   PUBLIC_URL=https://your-app.railway.app
   ```

4. **Get Public URL** and update Vercel environment:
   ```
   NEXT_PUBLIC_DIRECTUS_URL=https://your-cms.railway.app
   ```

### Option B: DigitalOcean App Platform

1. **Create DigitalOcean Account**
2. **App Platform → Create App**
3. **Upload docker-compose.yml**
4. **Configure domain and SSL**

### Option C: Your Own VPS

1. **Get a VPS** (DigitalOcean, Linode, etc.)
2. **Install Docker and Docker Compose**
3. **Upload your infra/directus/ folder**
4. **Run**: `docker compose up -d`
5. **Configure reverse proxy** (Nginx + Let's Encrypt)

## Part 3: Post-Deployment Setup

### 1. Update Directus URL
Once Directus is live, update Vercel environment:
```
NEXT_PUBLIC_DIRECTUS_URL=https://your-live-directus-url.com
```

### 2. Re-run Setup Scripts
On your live Directus instance:
```bash
# Update scripts with your live URL
DIRECTUS_URL="https://your-live-directus-url.com"

# Run setup scripts
./scripts/setup-directus-auto.sh
./scripts/setup-permissions.sh
./scripts/create-authors.sh
./scripts/setup-public-permissions.sh
```

### 3. Configure CORS
In Directus environment, allow your Vercel domain:
```
CORS_ORIGIN=https://your-app.vercel.app,https://your-directus-url.com
```

### 4. Test Everything
- Visit your live site
- Test regional blog pages
- Login to Directus as regional author
- Create test content

## Quick Links After Deployment

- **Live Site**: https://your-app.vercel.app
- **CMS Admin**: https://your-directus-url.com
- **Chicago Blog**: https://your-app.vercel.app/chicago/blog
- **GitHub Repo**: https://github.com/GrahamMcBain/heyneighbor

## Environment Variables Summary

### Vercel (Next.js):
```env
NEXT_PUBLIC_MEETING_URL=https://calendly.com/heyneighbor/weekly-call
NEXT_PUBLIC_CHAPTER_START_URL=https://forms.gle/your-form
NEXT_PUBLIC_WHATSAPP_URL=https://chat.whatsapp.com/your-group
NEXT_PUBLIC_FIND_URL=https://heyneighbor.org/find
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-url.com
```

### Directus (Railway/VPS):
```env
DATABASE_URL=postgresql://...
KEY=random-32-char-key
SECRET=random-64-char-secret
ADMIN_EMAIL=grahammcbain@gmail.com
ADMIN_PASSWORD=secure-password
PUBLIC_URL=https://your-directus-url.com
CORS_ORIGIN=https://your-vercel-app.vercel.app
```
