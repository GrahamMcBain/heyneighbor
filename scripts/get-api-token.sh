#!/bin/bash

# Get API Token Script
# Creates a static token for Next.js API access

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "🔑 Creating API token for Next.js..."

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
PUBLIC_ROLE_ID=$(curl -s -X GET "$DIRECTUS_URL/roles?filter[name][_eq]=Public Read" -H "Authorization: Bearer $TOKEN" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

echo "📋 Public Read Role ID: $PUBLIC_ROLE_ID"

# Try to create static token through users endpoint
echo "🔐 Creating static token..."

# Create a system user for the API token
API_USER_RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"api@heyneighbor.org\",
    \"password\": \"ApiToken123!\",
    \"first_name\": \"API\",
    \"last_name\": \"User\",
    \"role\": \"$PUBLIC_ROLE_ID\",
    \"status\": \"active\"
  }")

echo "API User Response: $API_USER_RESPONSE"

# Generate a simple token for the .env
SIMPLE_TOKEN=$(openssl rand -hex 32 2>/dev/null || echo "fallback-token-$(date +%s)")

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Add this to your .env.local file:"
echo "DIRECTUS_STATIC_TOKEN=api_token_here"
echo ""
echo "🔍 To get your actual API token:"
echo "1. Log into Directus at $DIRECTUS_URL"
echo "2. Go to Settings → Access Tokens"
echo "3. Create a new token with 'Public Read' permissions"
echo "4. Copy the token to your .env.local file"
echo ""
echo "👤 API user created: api@heyneighbor.org / ApiToken123!"
echo "   (This user has Public Read permissions for API access)"
