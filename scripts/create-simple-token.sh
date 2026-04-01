#!/bin/bash

# Simple API Token Creation
# Creates a basic authentication token for API access

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "🔑 Creating simple API access..."

# Get admin token
TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get access token"
    exit 1
fi

echo "✅ Got admin token"

# Create a simple token by authenticating the API user we created
API_TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"api@heyneighbor.org","password":"ApiToken123!"}' | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -n "$API_TOKEN" ]; then
    echo "✅ Created API access token!"
    echo ""
    echo "📝 Add this to your .env.local:"
    echo "DIRECTUS_STATIC_TOKEN=$API_TOKEN"
    echo ""
    echo "🔄 Or use the simpler approach:"
    echo "NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055"
    echo "# Leave DIRECTUS_STATIC_TOKEN empty to use public access"
else
    echo "❌ Could not create API token"
    echo ""
    echo "💡 Alternative: Configure the Public role for API access"
    echo "1. In Directus, go to Settings > Access Policies"
    echo "2. Click on 'Public' role"
    echo "3. Add read permissions for posts, regions, files, users"
    echo "4. Then leave DIRECTUS_STATIC_TOKEN empty in .env.local"
fi
