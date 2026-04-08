const ADMIN_EMAIL = 'grahammcbain@gmail.com';
const ADMIN_PASSWORD = 'YourSecurePassword123!';
const API_URL = 'http://localhost:8055';

async function setup() {
  console.log('🚀 Creating Directus collections...');
  
  try {
    // Login
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      })
    });
    
    const { data } = await loginResponse.json();
    const token = data.access_token;
    console.log('✅ Logged in');
    
    // Create regions collection
    await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        collection: 'regions',
        meta: { icon: 'place', color: '#2196F3' }
      })
    });
    console.log('✅ Created regions collection');
    
    // Add name field
    await fetch(`${API_URL}/fields/regions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'name',
        type: 'string',
        meta: { interface: 'input', required: true },
        schema: { max_length: 255, is_nullable: false }
      })
    });
    console.log('✅ Added name field');
    
    // Add slug field
    await fetch(`${API_URL}/fields/regions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', required: true },
        schema: { max_length: 255, is_nullable: false, is_unique: true }
      })
    });
    console.log('✅ Added slug field');
    
    // Add description field
    await fetch(`${API_URL}/fields/regions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'description',
        type: 'text',
        meta: { interface: 'input-rich-text-html' }
      })
    });
    console.log('✅ Added description field');
    
    // Add status field
    await fetch(`${API_URL}/fields/regions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'status',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Published', value: 'published' },
              { text: 'Draft', value: 'draft' }
            ]
          },
          required: true
        },
        schema: { default_value: 'draft' }
      })
    });
    console.log('✅ Added status field');
    
    // Create posts collection
    await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        collection: 'posts',
        meta: { icon: 'article', color: '#4CAF50' }
      })
    });
    console.log('✅ Created posts collection');
    
    // Add title field to posts
    await fetch(`${API_URL}/fields/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'title',
        type: 'string',
        meta: { interface: 'input', required: true },
        schema: { max_length: 255, is_nullable: false }
      })
    });
    console.log('✅ Added title field to posts');
    
    // Add slug field to posts
    await fetch(`${API_URL}/fields/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', required: true },
        schema: { max_length: 255, is_nullable: false }
      })
    });
    console.log('✅ Added slug field to posts');
    
    // Add content field to posts
    await fetch(`${API_URL}/fields/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'content',
        type: 'text',
        meta: { interface: 'input-rich-text-html' }
      })
    });
    console.log('✅ Added content field to posts');
    
    // Add status field to posts
    await fetch(`${API_URL}/fields/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        field: 'status',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Published', value: 'published' },
              { text: 'Draft', value: 'draft' }
            ]
          },
          required: true
        },
        schema: { default_value: 'draft' }
      })
    });
    console.log('✅ Added status field to posts');
    
    // Create initial regions
    const regions = [
      { name: 'Chicago', slug: 'chicago', description: 'Building community in Chicago', status: 'published' },
      { name: 'Los Angeles', slug: 'los-angeles', description: 'Connecting LA neighborhoods', status: 'published' },
      { name: 'New York', slug: 'new-york', description: 'NYC community building', status: 'published' },
      { name: 'San Francisco', slug: 'san-francisco', description: 'Bay Area connections', status: 'published' }
    ];
    
    for (const region of regions) {
      await fetch(`${API_URL}/items/regions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(region)
      });
      console.log(`✅ Created region: ${region.name}`);
    }
    
    console.log('🎉 Setup complete! Check your Directus admin.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setup();
