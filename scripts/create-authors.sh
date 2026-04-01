#!/bin/bash

# Create Regional Authors Script
# Creates sample user accounts for each region

DIRECTUS_URL="http://localhost:8055"
ADMIN_EMAIL="grahammcbain@gmail.com"
ADMIN_PASSWORD="Thanks!23"

echo "👥 Creating regional author accounts..."

# Get access token
TOKEN=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Failed to get access token"
    exit 1
fi

# Get region IDs and role ID
REGIONS=$(curl -s -X GET "$DIRECTUS_URL/items/regions" -H "Authorization: Bearer $TOKEN")
ROLE_ID=$(curl -s -X GET "$DIRECTUS_URL/roles?filter[name][_eq]=Regional Author" -H "Authorization: Bearer $TOKEN" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

echo "✅ Got region data and role ID: $ROLE_ID"

# Create Chicago author
echo "🏙️ Creating Chicago author..."
CHICAGO_ID=$(echo $REGIONS | grep -o '"slug":"chicago"[^}]*"id":"[^"]*' | grep -o '"id":"[^"]*' | cut -d'"' -f4)

curl -s -X POST "$DIRECTUS_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"chicago@heyneighbor.org\",
    \"password\": \"Chicago123!\",
    \"first_name\": \"Sarah\",
    \"last_name\": \"Chen\",
    \"role\": \"$ROLE_ID\",
    \"region\": \"$CHICAGO_ID\",
    \"bio\": \"Community organizer passionate about bringing neighbors together in the Windy City. I've been facilitating local meetups and events for over 3 years.\",
    \"status\": \"active\"
  }" > /dev/null

echo "✅ Created Chicago author: chicago@heyneighbor.org (password: Chicago123!)"

# Create Los Angeles author
echo "🌴 Creating Los Angeles author..."
LA_ID=$(echo $REGIONS | grep -o '"slug":"los-angeles"[^}]*"id":"[^"]*' | grep -o '"id":"[^"]*' | cut -d'"' -f4)

curl -s -X POST "$DIRECTUS_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"losangeles@heyneighbor.org\",
    \"password\": \"LosAngeles123!\",
    \"first_name\": \"Marcus\",
    \"last_name\": \"Rodriguez\",
    \"role\": \"$ROLE_ID\",
    \"region\": \"$LA_ID\",
    \"bio\": \"LA native who believes in the power of neighborhood connections. I organize monthly community walks and outdoor movie nights in various LA neighborhoods.\",
    \"status\": \"active\"
  }" > /dev/null

echo "✅ Created LA author: losangeles@heyneighbor.org (password: LosAngeles123!)"

# Create New York author
echo "🗽 Creating New York author..."
NY_ID=$(echo $REGIONS | grep -o '"slug":"new-york"[^}]*"id":"[^"]*' | grep -o '"id":"[^"]*' | cut -d'"' -f4)

curl -s -X POST "$DIRECTUS_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"newyork@heyneighbor.org\",
    \"password\": \"NewYork123!\",
    \"first_name\": \"Aisha\",
    \"last_name\": \"Johnson\",
    \"role\": \"$ROLE_ID\",
    \"region\": \"$NY_ID\",
    \"bio\": \"Brooklyn-based community builder who loves connecting people across NYC's diverse neighborhoods. I run weekly coffee meetups and seasonal block parties.\",
    \"status\": \"active\"
  }" > /dev/null

echo "✅ Created NYC author: newyork@heyneighbor.org (password: NewYork123!)"

# Create San Francisco author
echo "🌉 Creating San Francisco author..."
SF_ID=$(echo $REGIONS | grep -o '"slug":"san-francisco"[^}]*"id":"[^"]*' | grep -o '"id":"[^"]*' | cut -d'"' -f4)

curl -s -X POST "$DIRECTUS_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"sanfrancisco@heyneighbor.org\",
    \"password\": \"SanFrancisco123!\",
    \"first_name\": \"David\",
    \"last_name\": \"Kim\",
    \"role\": \"$ROLE_ID\",
    \"region\": \"$SF_ID\",
    \"bio\": \"Tech professional turned community organizer. I'm passionate about creating inclusive spaces where neighbors can connect across SF's vibrant districts.\",
    \"status\": \"active\"
  }" > /dev/null

echo "✅ Created SF author: sanfrancisco@heyneighbor.org (password: SanFrancisco123!)"

echo ""
echo "🎉 Regional authors created successfully!"
echo ""
echo "📧 Login credentials:"
echo "  Chicago:      chicago@heyneighbor.org / Chicago123!"
echo "  Los Angeles:  losangeles@heyneighbor.org / LosAngeles123!"
echo "  New York:     newyork@heyneighbor.org / NewYork123!"
echo "  San Francisco: sanfrancisco@heyneighbor.org / SanFrancisco123!"
echo ""
echo "🔐 Each author can only access content for their assigned region"
echo "📝 They can now log in to Directus and create posts for their region"
