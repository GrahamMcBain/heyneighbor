#!/bin/bash

# Setup Public Role Permissions
# Configures the built-in Public role for API access

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "🌐 Setting up Public role permissions..."

# Get access token
TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get access token"
    exit 1
fi

# Find the Public role (it's a built-in role)
PUBLIC_ROLE_ID=$(curl -s -X GET "$DIRECTUS_URL/roles" -H "Authorization: Bearer $TOKEN" | grep -A10 -B10 '"name":"Public"' | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

if [ -z "$PUBLIC_ROLE_ID" ]; then
    echo "❌ Public role not found, let's list all roles:"
    curl -s -X GET "$DIRECTUS_URL/roles" -H "Authorization: Bearer $TOKEN" | grep -o '"name":"[^"]*'
    exit 1
fi

echo "✅ Found Public role (ID: $PUBLIC_ROLE_ID)"

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
echo "🎉 Public role permissions configured!"
echo ""
echo "✅ The built-in Public role now has API access to:"
echo "  - Posts (published only)"
echo "  - Regions (published only)"  
echo "  - Files (all files)"
echo "  - Users (basic info only)"
echo ""
echo "🚀 Your Next.js app can now access content without authentication!"
echo "📝 No API token needed in .env.local"
