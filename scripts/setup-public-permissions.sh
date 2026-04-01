#!/bin/bash

# Setup Public Read Role Permissions
# Configures the Public Read role for API access

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "🌐 Setting up Public Read role permissions..."

# Get access token
TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get access token"
    exit 1
fi

# Get Public Read role ID
PUBLIC_ROLE_ID=$(curl -s -X GET "$DIRECTUS_URL/roles" -H "Authorization: Bearer $TOKEN" | grep -A5 -B5 '"name":"Public Read"' | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$PUBLIC_ROLE_ID" ]; then
    echo "❌ Public Read role not found"
    exit 1
fi

echo "✅ Found Public Read role (ID: $PUBLIC_ROLE_ID)"

# Clear existing permissions for this role
echo "🧹 Clearing existing permissions..."
curl -s -X DELETE "$DIRECTUS_URL/permissions?filter[role][_eq]=$PUBLIC_ROLE_ID" \
  -H "Authorization: Bearer $TOKEN" > /dev/null

# Posts - Read published only
echo "📰 Adding posts read permission..."
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$PUBLIC_ROLE_ID\",
    \"collection\": \"posts\",
    \"action\": \"read\",
    \"permissions\": {
      \"status\": {
        \"_eq\": \"published\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Regions - Read published only
echo "🏙️ Adding regions read permission..."
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$PUBLIC_ROLE_ID\",
    \"collection\": \"regions\",
    \"action\": \"read\",
    \"permissions\": {
      \"status\": {
        \"_eq\": \"published\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Files - Read all
echo "📁 Adding files read permission..."
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$PUBLIC_ROLE_ID\",
    \"collection\": \"directus_files\",
    \"action\": \"read\",
    \"permissions\": {},
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Users - Read limited fields
echo "👥 Adding users read permission..."
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$PUBLIC_ROLE_ID\",
    \"collection\": \"directus_users\",
    \"action\": \"read\",
    \"permissions\": {},
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"id\", \"first_name\", \"last_name\", \"bio\", \"avatar\"]
  }" > /dev/null

echo ""
echo "🎉 Public Read role permissions configured!"
echo ""
echo "✅ Added permissions:"
echo "  - Posts: Read published posts only"
echo "  - Regions: Read published regions only"
echo "  - Files: Read all files"
echo "  - Users: Read basic user info (name, bio, avatar)"
echo ""
echo "🚀 Your Next.js app can now access published content without an API token!"
echo ""
echo "📝 Your .env.local should have:"
echo "NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055"
echo "# No DIRECTUS_STATIC_TOKEN needed - using Public role"
