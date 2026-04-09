const API_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'grahammcbain@gmail.com';
const ADMIN_PASSWORD = 'Thanks!23';

async function checkResponse(response, operation) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${operation} failed (${response.status}): ${error}`);
  }
  return response.json();
}

async function setupLiveDirectus() {
  try {
    console.log('🚀 Setting up live Directus database...\n');
    
    // Login and get token
    console.log('🔐 Logging in...');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    
    const loginData = await checkResponse(loginResponse, 'Login');
    const token = loginData.data.access_token;
    console.log('✅ Authenticated successfully\n');
    
    // Check what collections exist
    console.log('📋 Checking existing collections...');
    const collectionsResponse = await fetch(`${API_URL}/collections`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const collectionsData = await checkResponse(collectionsResponse, 'Get collections');
    const existingCollections = collectionsData.data.map(c => c.collection);
    console.log('Existing collections:', existingCollections.filter(c => !c.startsWith('directus_')));
    
    // Create regions collection if it doesn't exist
    if (!existingCollections.includes('regions')) {
      console.log('\n🏗️ Creating regions collection...');
      const regionsResponse = await fetch(`${API_URL}/collections`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          collection: 'regions',
          meta: { icon: 'place', color: '#2196F3' }
        })
      });
      await checkResponse(regionsResponse, 'Create regions collection');
      console.log('✅ Created regions collection');
      
      // Add fields to regions
      const regionFields = [
        { field: 'name', type: 'string', meta: { interface: 'input', required: true }, schema: { max_length: 255, is_nullable: false } },
        { field: 'slug', type: 'string', meta: { interface: 'input', required: true }, schema: { max_length: 255, is_nullable: false, is_unique: true } },
        { field: 'description', type: 'text', meta: { interface: 'input-rich-text-html' } },
        { field: 'hero_image', type: 'uuid', meta: { interface: 'file-image' } },
        { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, required: true }, schema: { default_value: 'draft' } }
      ];
      
      for (const field of regionFields) {
        const fieldResponse = await fetch(`${API_URL}/fields/regions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(field)
        });
        await checkResponse(fieldResponse, `Create field ${field.field}`);
        console.log(`✅ Added field: ${field.field}`);
      }
    } else {
      console.log('✅ Regions collection already exists');
    }
    
    // Create posts collection if it doesn't exist
    if (!existingCollections.includes('posts')) {
      console.log('\n📰 Creating posts collection...');
      const postsResponse = await fetch(`${API_URL}/collections`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          collection: 'posts',
          meta: { icon: 'article', color: '#4CAF50' }
        })
      });
      await checkResponse(postsResponse, 'Create posts collection');
      console.log('✅ Created posts collection');
      
      // Add basic fields to posts
      const postFields = [
        { field: 'title', type: 'string', meta: { interface: 'input', required: true }, schema: { max_length: 255, is_nullable: false } },
        { field: 'slug', type: 'string', meta: { interface: 'input', required: true }, schema: { max_length: 255, is_nullable: false } },
        { field: 'excerpt', type: 'text', meta: { interface: 'input-multiline' } },
        { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html' } },
        { field: 'cover_image', type: 'uuid', meta: { interface: 'file-image' } },
        { field: 'published_at', type: 'dateTime', meta: { interface: 'datetime' } },
        { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, required: true }, schema: { default_value: 'draft' } }
      ];
      
      for (const field of postFields) {
        const fieldResponse = await fetch(`${API_URL}/fields/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(field)
        });
        await checkResponse(fieldResponse, `Create field ${field.field}`);
        console.log(`✅ Added field: ${field.field}`);
      }
    } else {
      console.log('✅ Posts collection already exists');
    }
    
    // Check if regions have data
    console.log('\n🏙️ Checking regions data...');
    const regionsDataResponse = await fetch(`${API_URL}/items/regions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (regionsDataResponse.ok) {
      const regionsData = await regionsDataResponse.json();
      if (regionsData.data && regionsData.data.length > 0) {
        console.log('✅ Regions already exist:');
        regionsData.data.forEach(region => {
          console.log(`  - ${region.name} (${region.slug})`);
        });
      } else {
        // Create initial regions
        console.log('📍 Creating initial regions...');
        const regions = [
          { name: 'Chicago', slug: 'chicago', description: 'Building community connections in the Windy City', status: 'published' },
          { name: 'Los Angeles', slug: 'los-angeles', description: 'Connecting neighborhoods across the City of Angels', status: 'published' },
          { name: 'New York', slug: 'new-york', description: 'Bringing together the diverse communities of NYC', status: 'published' },
          { name: 'San Francisco', slug: 'san-francisco', description: 'Creating community in the Bay Area', status: 'published' }
        ];
        
        for (const region of regions) {
          const regionResponse = await fetch(`${API_URL}/items/regions`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(region)
          });
          await checkResponse(regionResponse, `Create region ${region.name}`);
          console.log(`✅ Created region: ${region.name}`);
        }
      }
    } else {
      console.log('❌ Cannot access regions - permission issue');
    }
    
    console.log('\n🎉 Setup complete!');
    console.log('📱 Refresh your Directus admin to see the collections');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run immediately (ES module)
setupLiveDirectus();
