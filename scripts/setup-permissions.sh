#!/bin/bash

# Regional Author Permissions Setup Script
# Creates roles and permissions for regional content management

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "🔐 Setting up regional author permissions..."

# Function to check if command succeeded
check_success() {
    if [ $? -eq 0 ]; then
        echo "✅ $1"
    else
        echo "❌ Failed: $1"
        exit 1
    fi
}

# Get access token
echo "🔑 Getting admin access token..."
TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get access token. Check your credentials."
    exit 1
fi
check_success "Got admin access token"

# Create Regional Author role
echo "👤 Creating Regional Author role..."
ROLE_RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/roles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Regional Author",
    "icon": "edit",
    "description": "Authors who can only edit content for their assigned region",
    "ip_access": null,
    "enforce_tfa": false,
    "admin_access": false,
    "app_access": true
  }')

ROLE_ID=$(echo $ROLE_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -z "$ROLE_ID" ]; then
    echo "❌ Failed to create Regional Author role"
    exit 1
fi
check_success "Created Regional Author role (ID: $ROLE_ID)"

# Create Public Read role for API access
echo "📖 Creating Public Read role..."
PUBLIC_ROLE_RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/roles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Public Read",
    "icon": "public",
    "description": "Read-only access to published content for API",
    "ip_access": null,
    "enforce_tfa": false,
    "admin_access": false,
    "app_access": false
  }')

PUBLIC_ROLE_ID=$(echo $PUBLIC_ROLE_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
check_success "Created Public Read role (ID: $PUBLIC_ROLE_ID)"

# Set permissions for Regional Author - Posts collection
echo "📝 Setting posts permissions for Regional Authors..."

# Posts - Create (with region preset)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"posts\",
    \"action\": \"create\",
    \"permissions\": {},
    \"validation\": {},
    \"presets\": {
      \"region\": \"\$CURRENT_USER.region\",
      \"author\": \"\$CURRENT_USER\"
    },
    \"fields\": [\"*\"]
  }" > /dev/null

# Posts - Read (filtered by region)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"posts\",
    \"action\": \"read\",
    \"permissions\": {
      \"region\": {
        \"_eq\": \"\$CURRENT_USER.region\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Posts - Update (filtered by region)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"posts\",
    \"action\": \"update\",
    \"permissions\": {
      \"region\": {
        \"_eq\": \"\$CURRENT_USER.region\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Posts - Delete (filtered by region)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"posts\",
    \"action\": \"delete\",
    \"permissions\": {
      \"region\": {
        \"_eq\": \"\$CURRENT_USER.region\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

check_success "Set posts permissions"

# Set permissions for Regional Author - Regions collection (read only their region)
echo "🏙️ Setting regions permissions for Regional Authors..."

curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"regions\",
    \"action\": \"read\",
    \"permissions\": {
      \"id\": {
        \"_eq\": \"\$CURRENT_USER.region\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

check_success "Set regions permissions"

# Set permissions for Regional Author - Files collection
echo "📁 Setting files permissions for Regional Authors..."

# Files - Create
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"directus_files\",
    \"action\": \"create\",
    \"permissions\": {},
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Files - Read (own files only)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"directus_files\",
    \"action\": \"read\",
    \"permissions\": {
      \"_or\": [
        {
          \"uploaded_by\": {
            \"_eq\": \"\$CURRENT_USER\"
          }
        },
        {
          \"uploaded_by\": {
            \"_null\": true
          }
        }
      ]
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Files - Update (own files only)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"directus_files\",
    \"action\": \"update\",
    \"permissions\": {
      \"uploaded_by\": {
        \"_eq\": \"\$CURRENT_USER\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Files - Delete (own files only)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"directus_files\",
    \"action\": \"delete\",
    \"permissions\": {
      \"uploaded_by\": {
        \"_eq\": \"\$CURRENT_USER\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

check_success "Set files permissions"

# Set permissions for Regional Author - Users collection (self only)
echo "👥 Setting user permissions for Regional Authors..."

# Users - Read (self only)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"directus_users\",
    \"action\": \"read\",
    \"permissions\": {
      \"id\": {
        \"_eq\": \"\$CURRENT_USER\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

# Users - Update (self only)
curl -s -X POST "$DIRECTUS_URL/permissions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"role\": \"$ROLE_ID\",
    \"collection\": \"directus_users\",
    \"action\": \"update\",
    \"permissions\": {
      \"id\": {
        \"_eq\": \"\$CURRENT_USER\"
      }
    },
    \"validation\": {},
    \"presets\": {},
    \"fields\": [\"*\"]
  }" > /dev/null

check_success "Set user permissions"

# Set permissions for Public Read role
echo "🌐 Setting public read permissions..."

# Public Read - Posts (published only)
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

# Public Read - Regions (published only)
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

# Public Read - Files (all files)
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

# Public Read - Users (limited fields)
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

check_success "Set public read permissions"

# Create API token for Next.js
echo "🔑 Creating API token for Next.js..."
TOKEN_RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/access-tokens" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"NextJS API Token\",
    \"permissions\": \"$PUBLIC_ROLE_ID\",
    \"expires\": null
  }")

API_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -n "$API_TOKEN" ]; then
    echo "✅ Created API token: $API_TOKEN"
    echo ""
    echo "📝 Add this to your .env.local file:"
    echo "DIRECTUS_STATIC_TOKEN=$API_TOKEN"
else
    echo "❌ Failed to create API token"
fi

echo ""
echo "🎉 Regional author permissions setup complete!"
echo ""
echo "✅ Roles created:"
echo "  - Regional Author (ID: $ROLE_ID)"
echo "  - Public Read (ID: $PUBLIC_ROLE_ID)"
echo ""
echo "✅ Permissions configured:"
echo "  - Regional Authors can only see/edit their region's content"
echo "  - Regional Authors can upload and manage their own files"
echo "  - Regional Authors can only update their own profile"
echo "  - Public API has read-only access to published content"
echo ""
echo "🚀 Next steps:"
echo "1. Update .env.local with the API token above"
echo "2. Create user accounts for regional authors"
echo "3. Assign each user to the Regional Author role"
echo "4. Set each user's region field to their assigned region"
