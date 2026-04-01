# Directus CMS Setup Guide

## 1. Access Directus Admin

1. Go to http://localhost:8055
2. Login with:
   - Email: `admin@heyneighbor.org`
   - Password: `changeme123`

## 2. Create Collections

### A. Create "regions" Collection

1. Go to **Settings** → **Data Model**
2. Click **Create Collection**
3. Collection Name: `regions`
4. Primary Key Field: `id` (UUID)
5. Add these fields:

| Field Name | Type | Interface | Options | Required |
|------------|------|-----------|---------|----------|
| `name` | String | Input | - | ✅ |
| `slug` | String | Input | Slug: true | ✅ |
| `description` | Text | Rich Text HTML | - | ❌ |
| `hero_image` | File | File Image | - | ❌ |
| `status` | String | Select Dropdown | draft, published | ✅ |
| `sort` | Integer | Input | - | ❌ |

### B. Create "posts" Collection

1. Click **Create Collection**
2. Collection Name: `posts`
3. Primary Key Field: `id` (UUID)
4. Add these fields:

| Field Name | Type | Interface | Options | Required |
|------------|------|-----------|---------|----------|
| `title` | String | Input | - | ✅ |
| `slug` | String | Input | Slug: true | ✅ |
| `status` | String | Select Dropdown | draft, published | ✅ |
| `excerpt` | Text | Textarea | - | ❌ |
| `content` | Text | Rich Text HTML | - | ❌ |
| `cover_image` | File | File Image | - | ❌ |
| `published_at` | DateTime | DateTime | - | ❌ |
| `region` | Many to One | Dropdown | Related: regions | ✅ |
| `author` | Many to One | Dropdown | Related: directus_users | ✅ |
| `sort` | Integer | Input | - | ❌ |

### C. Add Fields to Users Collection

1. Go to **Settings** → **Data Model**
2. Find and edit **User Management**
3. Add these fields:

| Field Name | Type | Interface | Options | Required |
|------------|------|-----------|---------|----------|
| `region` | Many to One | Dropdown | Related: regions | ❌ |
| `bio` | Text | Textarea | - | ❌ |

## 3. Create Initial Regions

1. Go to **Content** → **regions**
2. Create these regions:

| Name | Slug | Status | Sort |
|------|------|---------|------|
| Chicago | chicago | published | 1 |
| Los Angeles | los-angeles | published | 2 |
| New York | new-york | published | 3 |
| San Francisco | san-francisco | published | 4 |

## 4. Create Regional Author Role

1. Go to **Settings** → **Roles & Permissions**
2. Click **Create Role**
3. Role Name: `Regional Author`
4. Description: `Authors who can only edit content for their region`

### Permissions for Regional Author:

#### Posts Collection:
- **Create**: ✅ (with preset: `region` = `$CURRENT_USER.region`)
- **Read**: ✅ (with filter: `region._eq.$CURRENT_USER.region`)
- **Update**: ✅ (with filter: `region._eq.$CURRENT_USER.region`)
- **Delete**: ✅ (with filter: `region._eq.$CURRENT_USER.region`)

#### Regions Collection:
- **Read**: ✅ (with filter: `id._eq.$CURRENT_USER.region`)

#### Files Collection:
- **Create**: ✅
- **Read**: ✅
- **Update**: ✅ (with filter: `uploaded_by._eq.$CURRENT_USER`)
- **Delete**: ✅ (with filter: `uploaded_by._eq.$CURRENT_USER`)

#### Users Collection:
- **Read**: ✅ (with filter: `id._eq.$CURRENT_USER`)
- **Update**: ✅ (with filter: `id._eq.$CURRENT_USER`)

## 5. Create Regional Authors

1. Go to **User Directory**
2. For each region, create a user:
   - **Email**: e.g., `chicago@heyneighbor.org`
   - **Password**: Temporary password (they can change it)
   - **Role**: `Regional Author`
   - **Region**: Assign their region
   - **First Name**: Author's first name
   - **Last Name**: Author's last name

## 6. Generate Static Token (for Next.js)

1. Go to **Settings** → **Access Tokens**
2. Click **Create Token**
3. Name: `NextJS Read Token`
4. Type: `Static Token`
5. Role: Create a new role called `Public Read` with:
   - **Posts**: Read only (filter: `status._eq.published`)
   - **Regions**: Read only (filter: `status._eq.published`)
   - **Files**: Read only
6. Copy the token and add to your `.env.local`:
   ```
   DIRECTUS_STATIC_TOKEN=your-token-here
   ```

## 7. Test the Setup

1. Create a test post as a regional author
2. Verify they can only see their region's content
3. Verify the Next.js integration works

## Security Checklist

- [ ] Changed default admin password
- [ ] Created regional author accounts with strong passwords
- [ ] Configured proper permissions for each role
- [ ] Generated static token for API access
- [ ] Tested regional access restrictions

## Next Steps

Once setup is complete, you can:
1. Create the Next.js blog pages (`/[region]/blog`)
2. Set up webhooks for auto-deployment
3. Configure email notifications for new posts
