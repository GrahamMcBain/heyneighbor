import { createDirectus, rest, readItems, readItem } from '@directus/sdk';

// Define the schema for type safety. Directus SDK collection values are arrays.
interface RegionRecord {
    id: string;
    name: string;
    slug: string;
    description: string;
    hero_image: string;
    seo_title: string;
    seo_description: string;
    status: 'draft' | 'published';
}

interface PostRecord {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    published_at: string;
    status: 'draft' | 'published';
    region: RegionRecord;
    author: DirectusUserRecord;
}

interface DirectusUserRecord {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    bio: string;
    region: string;
}

interface Schema {
  regions: RegionRecord[];
  posts: PostRecord[];
  directus_users: DirectusUserRecord[];
}

export interface PostView {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  published_at?: string;
  region?: { name: string; slug: string };
  author?: { first_name?: string; last_name?: string; bio?: string; avatar?: string };
}

// Create Directus client
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

export const directus = createDirectus<Schema>(directusUrl).with(rest());

// Helper functions for common queries
export async function getRegions() {
  try {
    return await directus.request(
      readItems('regions', {
        fields: ['id', 'name', 'slug', 'description', 'hero_image'],
        filter: { status: { _eq: 'published' } },
        sort: ['name']
      })
    );
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
}

export async function getRegionBySlug(slug: string) {
  try {
    const regions = await directus.request(
      readItems('regions', {
        fields: ['*'],
        filter: { slug: { _eq: slug } },
        limit: 1
      })
    );
    return regions[0] || null;
  } catch (error) {
    console.error('Error fetching region:', error);
    return null;
  }
}

export async function getPostsByRegion(regionSlug: string, limit = 10) {
  try {
    const posts = await directus.request(
      readItems('posts', {
        fields: [
          'id',
          'title',
          'slug',
          'excerpt',
          'cover_image',
          'published_at',
          { author: ['first_name', 'last_name'] }
        ],
        filter: {
          status: { _eq: 'published' },
          region: { slug: { _eq: regionSlug } }
        },
        sort: ['-published_at'],
        limit
      })
    );
    return posts as unknown as PostView[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(regionSlug: string, postSlug: string) {
  try {
    const posts = await directus.request(
      readItems('posts', {
        fields: [
          '*',
          { author: ['first_name', 'last_name', 'bio', 'avatar'] },
          { region: ['name', 'slug'] }
        ],
        filter: {
          slug: { _eq: postSlug },
          status: { _eq: 'published' },
          region: { slug: { _eq: regionSlug } }
        },
        limit: 1
      })
    );
    return (posts[0] as unknown as PostView) || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Helper function to get asset URL
export function getAssetUrl(fileId: string | null, transform?: string) {
  if (!fileId) return null;
  const baseUrl = directusUrl;
  const transformQuery = transform ? `?${transform}` : '';
  return `${baseUrl}/assets/${fileId}${transformQuery}`;
}
