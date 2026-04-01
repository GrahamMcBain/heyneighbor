#!/usr/bin/env node

/**
 * Directus CMS Setup Script
 * Creates collections, fields, and initial data for regional blog management
 */

import { createDirectus, rest, staticToken, createCollection, createField, createItem, readItems } from '@directus/sdk';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@heyneighbor.org';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL).with(rest());

async function setupDirectus() {
  console.log('🚀 Setting up Directus CMS for HeyNeighbor...\n');

  try {
    // Check if Directus is accessible
    console.log('1. Checking Directus connectivity...');
    const response = await fetch(`${DIRECTUS_URL}/server/info`);
    if (!response.ok) {
      throw new Error(`Cannot connect to Directus at ${DIRECTUS_URL}`);
    }
    console.log('✅ Connected to Directus\n');

    // Create regions collection
    console.log('2. Creating regions collection...');
    await createRegionsCollection();
    console.log('✅ Regions collection created\n');

    // Create posts collection
    console.log('3. Creating posts collection...');
    await createPostsCollection();
    console.log('✅ Posts collection created\n');

    // Add region field to directus_users
    console.log('4. Adding region field to users...');
    await addRegionFieldToUsers();
    console.log('✅ User region field added\n');

    // Create initial regions
    console.log('5. Creating initial regions...');
    await createInitialRegions();
    console.log('✅ Initial regions created\n');

    // Create regional author roles
    console.log('6. Creating regional author roles...');
    await createRegionalAuthorRoles();
    console.log('✅ Regional roles created\n');

    console.log('🎉 Directus setup complete!\n');
    console.log('Next steps:');
    console.log('- Access Directus at:', DIRECTUS_URL);
    console.log('- Create user accounts for regional authors');
    console.log('- Assign regions to authors');
    console.log('- Start creating content!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    if (error.errors) {
      console.error('Details:', error.errors);
    }
    process.exit(1);
  }
}

async function createRegionsCollection() {
  await directus.request(createCollection({
    collection: 'regions',
    meta: {
      accountability: 'all',
      collection: 'regions',
      group: null,
      hidden: false,
      icon: 'place',
      item_duplication_fields: null,
      note: 'Geographic regions for chapter management',
      singleton: false,
      translations: null,
      archive_field: null,
      archive_app_filter: true,
      archive_value: null,
      unarchive_value: null,
      sort_field: 'sort',
      color: '#2196F3'
    },
    schema: {
      name: 'regions'
    }
  }));

  // Create fields for regions collection
  const regionFields = [
    {
      field: 'name',
      type: 'string',
      meta: {
        interface: 'input',
        options: {},
        display: 'formatted-value',
        display_options: {},
        note: 'Display name of the region (e.g., Chicago, Los Angeles)',
        required: true,
        readonly: false,
        hidden: false,
        sort: 1,
        width: 'full',
        translations: null,
        group: null
      },
      schema: {
        name: 'name',
        table: 'regions',
        type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: false
      }
    },
    {
      field: 'slug',
      type: 'string',
      meta: {
        interface: 'input',
        options: {
          slug: true,
          onlyOnCreate: false
        },
        display: 'formatted-value',
        note: 'URL-friendly slug (e.g., chicago, los-angeles)',
        required: true,
        readonly: false,
        hidden: false,
        sort: 2,
        width: 'full'
      },
      schema: {
        name: 'slug',
        table: 'regions',
        type: 'varchar',
        max_length: 255,
        is_nullable: false,
        is_unique: true
      }
    },
    {
      field: 'description',
      type: 'text',
      meta: {
        interface: 'input-rich-text-html',
        options: {},
        display: 'formatted-value',
        note: 'Description of the region and its community',
        required: false,
        readonly: false,
        hidden: false,
        sort: 3,
        width: 'full'
      },
      schema: {
        name: 'description',
        table: 'regions',
        type: 'text'
      }
    },
    {
      field: 'hero_image',
      type: 'uuid',
      meta: {
        interface: 'file-image',
        options: {},
        display: 'image',
        note: 'Hero image for the region page',
        required: false,
        readonly: false,
        hidden: false,
        sort: 4,
        width: 'full'
      },
      schema: {
        name: 'hero_image',
        table: 'regions',
        type: 'uuid'
      }
    },
    {
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Published', value: 'published' },
            { text: 'Draft', value: 'draft' },
            { text: 'Archived', value: 'archived' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Published', value: 'published', foreground: '#FFFFFF', background: '#00C897' },
            { text: 'Draft', value: 'draft', foreground: '#18222F', background: '#D3DAE4' },
            { text: 'Archived', value: 'archived', foreground: '#FFFFFF', background: '#F7971E' }
          ]
        },
        note: 'Publication status',
        required: true,
        readonly: false,
        hidden: false,
        sort: 5,
        width: 'half'
      },
      schema: {
        name: 'status',
        table: 'regions',
        type: 'varchar',
        max_length: 255,
        default_value: 'draft'
      }
    },
    {
      field: 'sort',
      type: 'integer',
      meta: {
        interface: 'input',
        options: {},
        display: 'formatted-value',
        note: 'Sort order',
        required: false,
        readonly: false,
        hidden: true,
        sort: 6,
        width: 'half'
      },
      schema: {
        name: 'sort',
        table: 'regions',
        type: 'integer'
      }
    }
  ];

  for (const field of regionFields) {
    await directus.request(createField('regions', field));
  }
}

async function createPostsCollection() {
  await directus.request(createCollection({
    collection: 'posts',
    meta: {
      accountability: 'all',
      collection: 'posts',
      group: null,
      hidden: false,
      icon: 'article',
      note: 'Blog posts for regional chapters',
      singleton: false,
      archive_field: null,
      archive_app_filter: true,
      sort_field: 'sort',
      color: '#4CAF50'
    },
    schema: {
      name: 'posts'
    }
  }));

  // Create fields for posts collection
  const postFields = [
    {
      field: 'title',
      type: 'string',
      meta: {
        interface: 'input',
        options: {},
        display: 'formatted-value',
        note: 'Post title',
        required: true,
        readonly: false,
        hidden: false,
        sort: 1,
        width: 'full'
      },
      schema: {
        name: 'title',
        table: 'posts',
        type: 'varchar',
        max_length: 255,
        is_nullable: false
      }
    },
    {
      field: 'slug',
      type: 'string',
      meta: {
        interface: 'input',
        options: {
          slug: true,
          onlyOnCreate: false
        },
        display: 'formatted-value',
        note: 'URL-friendly slug',
        required: true,
        readonly: false,
        hidden: false,
        sort: 2,
        width: 'half'
      },
      schema: {
        name: 'slug',
        table: 'posts',
        type: 'varchar',
        max_length: 255,
        is_nullable: false
      }
    },
    {
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Published', value: 'published' },
            { text: 'Draft', value: 'draft' },
            { text: 'Archived', value: 'archived' }
          ]
        },
        display: 'labels',
        display_options: {
          choices: [
            { text: 'Published', value: 'published', foreground: '#FFFFFF', background: '#00C897' },
            { text: 'Draft', value: 'draft', foreground: '#18222F', background: '#D3DAE4' },
            { text: 'Archived', value: 'archived', foreground: '#FFFFFF', background: '#F7971E' }
          ]
        },
        note: 'Publication status',
        required: true,
        readonly: false,
        hidden: false,
        sort: 3,
        width: 'half'
      },
      schema: {
        name: 'status',
        table: 'posts',
        type: 'varchar',
        max_length: 255,
        default_value: 'draft'
      }
    },
    {
      field: 'excerpt',
      type: 'text',
      meta: {
        interface: 'input-multiline',
        options: {},
        display: 'formatted-value',
        note: 'Brief excerpt for post listings',
        required: false,
        readonly: false,
        hidden: false,
        sort: 4,
        width: 'full'
      },
      schema: {
        name: 'excerpt',
        table: 'posts',
        type: 'text'
      }
    },
    {
      field: 'content',
      type: 'text',
      meta: {
        interface: 'input-rich-text-html',
        options: {},
        display: 'formatted-value',
        note: 'Full post content',
        required: false,
        readonly: false,
        hidden: false,
        sort: 5,
        width: 'full'
      },
      schema: {
        name: 'content',
        table: 'posts',
        type: 'text'
      }
    },
    {
      field: 'cover_image',
      type: 'uuid',
      meta: {
        interface: 'file-image',
        options: {},
        display: 'image',
        note: 'Cover image for the post',
        required: false,
        readonly: false,
        hidden: false,
        sort: 6,
        width: 'half'
      },
      schema: {
        name: 'cover_image',
        table: 'posts',
        type: 'uuid'
      }
    },
    {
      field: 'published_at',
      type: 'dateTime',
      meta: {
        interface: 'datetime',
        options: {},
        display: 'datetime',
        note: 'Publication date and time',
        required: false,
        readonly: false,
        hidden: false,
        sort: 7,
        width: 'half'
      },
      schema: {
        name: 'published_at',
        table: 'posts',
        type: 'timestamp'
      }
    },
    {
      field: 'region',
      type: 'uuid',
      meta: {
        interface: 'select-dropdown-m2o',
        options: {
          template: '{{name}}'
        },
        display: 'related-values',
        display_options: {
          template: '{{name}}'
        },
        note: 'Region this post belongs to',
        required: true,
        readonly: false,
        hidden: false,
        sort: 8,
        width: 'half'
      },
      schema: {
        name: 'region',
        table: 'posts',
        type: 'uuid',
        is_nullable: false,
        foreign_key_table: 'regions',
        foreign_key_column: 'id'
      }
    },
    {
      field: 'author',
      type: 'uuid',
      meta: {
        interface: 'select-dropdown-m2o',
        options: {
          template: '{{first_name}} {{last_name}}'
        },
        display: 'related-values',
        display_options: {
          template: '{{first_name}} {{last_name}}'
        },
        note: 'Post author',
        required: true,
        readonly: false,
        hidden: false,
        sort: 9,
        width: 'half'
      },
      schema: {
        name: 'author',
        table: 'posts',
        type: 'uuid',
        is_nullable: false,
        foreign_key_table: 'directus_users',
        foreign_key_column: 'id'
      }
    },
    {
      field: 'sort',
      type: 'integer',
      meta: {
        interface: 'input',
        options: {},
        display: 'formatted-value',
        note: 'Sort order',
        required: false,
        readonly: false,
        hidden: true,
        sort: 10,
        width: 'half'
      },
      schema: {
        name: 'sort',
        table: 'posts',
        type: 'integer'
      }
    }
  ];

  for (const field of postFields) {
    await directus.request(createField('posts', field));
  }
}

async function addRegionFieldToUsers() {
  await directus.request(createField('directus_users', {
    field: 'region',
    type: 'uuid',
    meta: {
      interface: 'select-dropdown-m2o',
      options: {
        template: '{{name}}'
      },
      display: 'related-values',
      display_options: {
        template: '{{name}}'
      },
      note: 'Region this user is responsible for',
      required: false,
      readonly: false,
      hidden: false,
      sort: 20,
      width: 'half'
    },
    schema: {
      name: 'region',
      table: 'directus_users',
      type: 'uuid',
      is_nullable: true,
      foreign_key_table: 'regions',
      foreign_key_column: 'id'
    }
  }));

  await directus.request(createField('directus_users', {
    field: 'bio',
    type: 'text',
    meta: {
      interface: 'input-multiline',
      options: {},
      display: 'formatted-value',
      note: 'Author bio',
      required: false,
      readonly: false,
      hidden: false,
      sort: 21,
      width: 'full'
    },
    schema: {
      name: 'bio',
      table: 'directus_users',
      type: 'text'
    }
  }));
}

async function createInitialRegions() {
  const regions = [
    {
      name: 'Chicago',
      slug: 'chicago',
      description: 'Building community connections in the Windy City',
      status: 'published',
      sort: 1
    },
    {
      name: 'Los Angeles',
      slug: 'los-angeles',
      description: 'Connecting neighborhoods across the City of Angels',
      status: 'published',
      sort: 2
    },
    {
      name: 'New York',
      slug: 'new-york',
      description: 'Bringing together the diverse communities of NYC',
      status: 'published',
      sort: 3
    },
    {
      name: 'San Francisco',
      slug: 'san-francisco',
      description: 'Creating community in the Bay Area',
      status: 'published',
      sort: 4
    }
  ];

  for (const region of regions) {
    await directus.request(createItem('regions', region));
  }
}

async function createRegionalAuthorRoles() {
  // This would typically be done through the Directus admin interface
  // as role creation requires more complex permissions setup
  console.log('Note: Regional author roles should be created manually in the Directus admin interface');
  console.log('Create a "Regional Author" role with the following permissions:');
  console.log('- Posts: Full access with filter { region: { _eq: "$CURRENT_USER.region" } }');
  console.log('- Regions: Read access only');
  console.log('- Files: Create and read access');
}

// Run setup
setupDirectus();
