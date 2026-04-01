import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getRegionBySlug, getPostsByRegion, getAssetUrl } from '@/lib/directus';

export async function generateStaticParams() {
  // Generate params for known regions
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
    title: `${region.name} | HeyNeighbor`,
    description: region.description || `Discover the HeyNeighbor community in ${region.name}`,
  };
}

export default async function RegionPage({ params }: { params: { region: string } }) {
  const region = await getRegionBySlug(params.region);
  
  if (!region) {
    notFound();
  }

  const recentPosts = await getPostsByRegion(params.region, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20">
        {region.hero_image && (
          <div className="absolute inset-0">
            <Image
              src={getAssetUrl(region.hero_image) || ''}
              alt={region.name}
              fill
              className="object-cover opacity-20"
            />
          </div>
        )}
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            HeyNeighbor {region.name}
          </h1>
          
          {region.description && (
            <div 
              className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: region.description }}
            />
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${params.region}/blog`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read Local Stories
            </Link>
            
            <Link
              href="/start"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Your Chapter
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Latest from {region.name}
              </h2>
              <Link
                href={`/${params.region}/blog`}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                View All Posts →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/${params.region}/blog/${post.slug}`}>
                    {post.cover_image && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                          src={getAssetUrl(post.cover_image) || ''}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500">
                      {post.author && (
                        <span>
                          By {post.author.first_name} {post.author.last_name}
                        </span>
                      )}
                      {post.published_at && (
                        <span className="ml-2">
                          • {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community Stats/Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Building Community in {region.name}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Active Neighborhoods</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Connect with Your Neighbors?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the HeyNeighbor community in {region.name} and start building meaningful connections in your neighborhood.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/start"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </Link>
            
            <Link
              href={`/${params.region}/blog`}
              className="inline-flex items-center px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
