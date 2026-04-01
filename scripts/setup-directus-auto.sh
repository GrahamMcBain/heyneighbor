#!/bin/bash

# Automated Directus Setup Script
# This script creates the complete data model for HeyNeighbor CMS

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "🚀 Setting up Directus CMS automatically..."

# Function to check if command succeeded
check_success() {
    if [ $? -eq 0 ]; then
        echo "✅ $1"
    else
        echo "❌ Failed: $1"
        exit 1
    fi
}

# Wait for Directus to be ready
echo "📡 Waiting for Directus to be ready..."
until curl -s "$DIRECTUS_URL/server/info" > /dev/null; do
    sleep 2
done
check_success "Directus is ready"

# Get access token
echo "🔐 Getting admin access token..."
TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get access token. Check your credentials."
    exit 1
fi
check_success "Got admin access token"

# Create regions collection
echo "🌍 Creating regions collection..."
curl -s -X POST "$DIRECTUS_URL/collections" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "collection": "regions",
    "meta": {
      "icon": "place",
      "color": "#2196F3"
    }
  }' > /dev/null
check_success "Created regions collection"

# Create regions fields
echo "📝 Adding fields to regions..."

# Name field
curl -s -X POST "$DIRECTUS_URL/fields/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "name",
    "type": "string",
    "meta": {
      "interface": "input",
      "required": true,
      "sort": 1
    },
    "schema": {
      "max_length": 255,
      "is_nullable": false
    }
  }' > /dev/null

# Slug field
curl -s -X POST "$DIRECTUS_URL/fields/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "slug",
    "type": "string",
    "meta": {
      "interface": "input",
      "options": {"slug": true},
      "required": true,
      "sort": 2
    },
    "schema": {
      "max_length": 255,
      "is_nullable": false,
      "is_unique": true
    }
  }' > /dev/null

# Description field
curl -s -X POST "$DIRECTUS_URL/fields/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "description",
    "type": "text",
    "meta": {
      "interface": "input-rich-text-html",
      "sort": 3
    }
  }' > /dev/null

# Hero image field
curl -s -X POST "$DIRECTUS_URL/fields/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "hero_image",
    "type": "uuid",
    "meta": {
      "interface": "file-image",
      "sort": 4
    }
  }' > /dev/null

# Status field
curl -s -X POST "$DIRECTUS_URL/fields/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "status",
    "type": "string",
    "meta": {
      "interface": "select-dropdown",
      "options": {
        "choices": [
          {"text": "Published", "value": "published"},
          {"text": "Draft", "value": "draft"}
        ]
      },
      "required": true,
      "sort": 5
    },
    "schema": {
      "default_value": "draft"
    }
  }' > /dev/null

check_success "Added regions fields"

# Create posts collection
echo "📰 Creating posts collection..."
curl -s -X POST "$DIRECTUS_URL/collections" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "collection": "posts",
    "meta": {
      "icon": "article",
      "color": "#4CAF50"
    }
  }' > /dev/null
check_success "Created posts collection"

# Create posts fields
echo "📝 Adding fields to posts..."

# Title field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "title",
    "type": "string",
    "meta": {
      "interface": "input",
      "required": true,
      "sort": 1
    },
    "schema": {
      "max_length": 255,
      "is_nullable": false
    }
  }' > /dev/null

# Slug field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "slug",
    "type": "string",
    "meta": {
      "interface": "input",
      "options": {"slug": true},
      "required": true,
      "sort": 2
    },
    "schema": {
      "max_length": 255,
      "is_nullable": false
    }
  }' > /dev/null

# Status field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "status",
    "type": "string",
    "meta": {
      "interface": "select-dropdown",
      "options": {
        "choices": [
          {"text": "Published", "value": "published"},
          {"text": "Draft", "value": "draft"}
        ]
      },
      "required": true,
      "sort": 3
    },
    "schema": {
      "default_value": "draft"
    }
  }' > /dev/null

# Excerpt field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "excerpt",
    "type": "text",
    "meta": {
      "interface": "input-multiline",
      "sort": 4
    }
  }' > /dev/null

# Content field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "content",
    "type": "text",
    "meta": {
      "interface": "input-rich-text-html",
      "sort": 5
    }
  }' > /dev/null

# Cover image field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "cover_image",
    "type": "uuid",
    "meta": {
      "interface": "file-image",
      "sort": 6
    }
  }' > /dev/null

# Published at field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "published_at",
    "type": "dateTime",
    "meta": {
      "interface": "datetime",
      "sort": 7
    }
  }' > /dev/null

# Region relationship field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "region",
    "type": "uuid",
    "meta": {
      "interface": "select-dropdown-m2o",
      "options": {
        "template": "{{name}}"
      },
      "required": true,
      "sort": 8
    },
    "schema": {
      "is_nullable": false
    }
  }' > /dev/null

# Create the actual foreign key relationship
curl -s -X POST "$DIRECTUS_URL/relations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "collection": "posts",
    "field": "region",
    "related_collection": "regions"
  }' > /dev/null

# Author relationship field
curl -s -X POST "$DIRECTUS_URL/fields/posts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "author",
    "type": "uuid",
    "meta": {
      "interface": "select-dropdown-m2o",
      "options": {
        "template": "{{first_name}} {{last_name}}"
      },
      "required": true,
      "sort": 9
    },
    "schema": {
      "is_nullable": false
    }
  }' > /dev/null

# Create the author relationship
curl -s -X POST "$DIRECTUS_URL/relations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "collection": "posts",
    "field": "author",
    "related_collection": "directus_users"
  }' > /dev/null

check_success "Added posts fields and relationships"

# Add region field to users
echo "👤 Adding region field to users..."
curl -s -X POST "$DIRECTUS_URL/fields/directus_users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "region",
    "type": "uuid",
    "meta": {
      "interface": "select-dropdown-m2o",
      "options": {
        "template": "{{name}}"
      },
      "sort": 20
    }
  }' > /dev/null

# Create user-region relationship
curl -s -X POST "$DIRECTUS_URL/relations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "collection": "directus_users",
    "field": "region",
    "related_collection": "regions"
  }' > /dev/null

# Add bio field to users
curl -s -X POST "$DIRECTUS_URL/fields/directus_users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field": "bio",
    "type": "text",
    "meta": {
      "interface": "input-multiline",
      "sort": 21
    }
  }' > /dev/null

check_success "Added user fields and relationships"

# Create initial regions
echo "🏙️ Creating initial regions..."

# Chicago
curl -s -X POST "$DIRECTUS_URL/items/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chicago",
    "slug": "chicago",
    "description": "Building community connections in the Windy City",
    "status": "published"
  }' > /dev/null

# Los Angeles
curl -s -X POST "$DIRECTUS_URL/items/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Los Angeles",
    "slug": "los-angeles", 
    "description": "Connecting neighborhoods across the City of Angels",
    "status": "published"
  }' > /dev/null

# New York
curl -s -X POST "$DIRECTUS_URL/items/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New York",
    "slug": "new-york",
    "description": "Bringing together the diverse communities of NYC", 
    "status": "published"
  }' > /dev/null

# San Francisco
curl -s -X POST "$DIRECTUS_URL/items/regions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "San Francisco",
    "slug": "san-francisco",
    "description": "Creating community in the Bay Area",
    "status": "published" 
  }' > /dev/null

check_success "Created initial regions"

echo ""
echo "🎉 Directus setup complete!"
echo ""
echo "✅ Collections created: regions, posts"
echo "✅ User fields added: region, bio"
echo "✅ Relationships configured"
echo "✅ Initial regions created: Chicago, LA, NYC, SF"
echo ""
echo "🚀 Next steps:"
echo "1. Access Directus at: $DIRECTUS_URL"
echo "2. Create regional author users and assign them roles"
echo "3. Set up permissions for regional access"
echo ""
echo "📋 Manual steps still needed:"
echo "- Create 'Regional Author' role with proper permissions"
echo "- Create user accounts for each region's author"
echo "- Generate API token for Next.js"
