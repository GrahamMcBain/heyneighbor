import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getRegionBySlug, getPostsByRegion, getAssetUrl } from '@/lib/directus';

export async function generateStaticParams() {
  return [
    { region: 'chicago' },
    { region: 'los-angeles' },
    { region: 'new-york' },
    { region: 'san-francisco' }
  ];
}

export async function generateMetadata({ params }: { params: { region: string } }) {
  const region = await getRegionBySlug(params.region);
  
  if (!region) {
    return {
      title: 'Region Not Found'
    };
  }

  return {
    title: `${region.name} Blog | HeyNeighbor`,
    description: `Read stories and updates from the HeyNeighbor community in ${region.name}`,
  };
}

export default async function RegionBlogPage({ params }: { params: { region: string } }) {
  const region = await getRegionBySlug(params.region);
  
  if (!region) {
    notFound();
  }

  const posts = await getPostsByRegion(params.region, 20);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <nav className="flex items-center text-blue-100 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">→</span>
            <Link href={`/${params.region}`} className="hover:text-white">
              {region.name}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-white">Blog</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-4">
            {region.name} Stories
          </h1>
          <p className="text-xl opacity-90">
            Community updates, local events, and neighbor spotlights from {region.name}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          // No posts state
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Stories Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              The {region.name} community is just getting started! Check back soon for local stories, events, and neighbor spotlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${params.region}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to {region.name}
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Involved
              </Link>
            </div>
          </div>
        ) : (
          // Posts grid
          <div className="space-y-12">
            {posts.map((post, index) => (
              <article key={post.id} className="group">
                <Link href={`/${params.region}/blog/${post.slug}`}>
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                    {/* Image */}
                    {post.cover_image && (
                      <div className="flex-1">
                        <div className="aspect-video rounded-xl overflow-hidden">
                          <Image
                            src={getAssetUrl(post.cover_image) || ''}
                            alt={post.title}
                            width={600}
                            height={337}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        
                        {post.excerpt && (
                          <p className="text-lg text-gray-600 line-clamp-4">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {post.author && (
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                <span className="text-blue-600 font-semibold text-xs">
                                  {post.author.first_name?.[0]}{post.author.last_name?.[0]}
                                </span>
                              </div>
                              <span>
                                {post.author.first_name} {post.author.last_name}
                              </span>
                            </div>
                          )}
                          {post.published_at && (
                            <span>
                              {new Date(post.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                          Read More →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {index < posts.length - 1 && (
                  <hr className="mt-12 border-gray-200" />
                )}
              </article>
            ))}
          </div>
        )}

        {/* Load More Button (future enhancement) */}
        {posts.length >= 20 && (
          <div className="text-center mt-16">
            <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Load More Stories
            </button>
          </div>
        )}
      </div>

      {/* Newsletter signup */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with {region.name}
          </h3>
          <p className="text-gray-600 mb-8">
            Get the latest stories and community updates delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
