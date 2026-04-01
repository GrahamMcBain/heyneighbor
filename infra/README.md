# HeyNeighbor CMS Infrastructure

This directory contains the Docker Compose setup for the self-hosted Directus CMS.

## Quick Start

1. **Start the CMS**:
   ```bash
   cd infra/directus
   docker compose up -d
   ```

2. **Access Directus**:
   - URL: http://localhost:8055
   - Admin Email: admin@heyneighbor.org
   - Admin Password: changeme123

3. **Stop the CMS**:
   ```bash
   docker compose down
   ```

## Configuration

### Environment Variables

Edit `.env.directus` to configure:
- Database settings
- Admin credentials
- CORS origins
- Email settings (for user invites)

### Production Setup

For production deployment:

1. **Change secrets** in `.env.directus`:
   ```bash
   KEY=your-unique-key-32-chars
   SECRET=your-super-secret-64-chars
   ```

2. **Update URLs**:
   ```bash
   PUBLIC_URL=https://cms.heyneighbor.org
   CORS_ORIGIN=https://heyneighbor.org,https://cms.heyneighbor.org
   ```

3. **Set up SSL** with reverse proxy (Nginx/Caddy)

4. **Configure backups**:
   ```bash
   # Database backup
   docker compose exec db pg_dump -U directus directus > backup.sql
   
   # Files backup
   docker compose exec directus tar -czf uploads-backup.tar.gz /directus/uploads
   ```

## Data Model

The CMS will be configured with these collections:
- **regions** - Geographic regions (Chicago, LA, etc.)
- **authors** - Regional content creators (extends directus_users)
- **posts** - Blog posts scoped to regions

## Permissions

- **Admin**: Full access to all content
- **Regional Authors**: Can only edit content for their assigned region

## Development

For local development, the CMS runs on port 8055 and the Next.js site on port 3000. Both are configured to work together with proper CORS settings.
