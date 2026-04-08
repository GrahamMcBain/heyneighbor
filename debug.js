const API_URL = 'http://localhost:8055';

async function debug() {
  try {
    console.log('🔍 Debugging Directus data...');
    
    // Login
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'grahammcbain@gmail.com',
        password: 'Thanks!23'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful');
    const token = loginData.data.access_token;
    
    // Check regions
    console.log('🏙️ Checking regions...');
    const regionsResponse = await fetch(`${API_URL}/items/regions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const regionsData = await regionsResponse.json();
    console.log('Regions found:', regionsData.data?.length || 0);
    
    if (regionsData.data && regionsData.data.length > 0) {
      regionsData.data.forEach(region => {
        console.log(`  - ${region.name} (${region.slug}) - Status: ${region.status}`);
      });
    } else {
      console.log('❌ No regions found in database');
    }
    
    // Check collections
    console.log('📋 Checking collections...');
    const collectionsResponse = await fetch(`${API_URL}/collections`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const collectionsData = await collectionsResponse.json();
    const customCollections = collectionsData.data?.filter(c => !c.collection.startsWith('directus_'));
    
    console.log('Custom collections:');
    customCollections?.forEach(collection => {
      console.log(`  - ${collection.collection}`);
    });
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debug();
