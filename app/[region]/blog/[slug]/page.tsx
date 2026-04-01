import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getRegionBySlug, getPostsByRegion, getPostBySlug, getAssetUrl } from '@/lib/directus';

export async function generateStaticParams() {
  // In a real app, you'd fetch all posts from all regions
  // For now, we'll return empty array and rely on dynamic generation
  return [];
}

export async function generateMetadata({ params }: { params: { region: string; slug: string } }) {
  const post = await getPostBySlug(params.region, params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | ${post.region?.name} | HeyNeighbor`,
    description: post.excerpt || `Read this story from the HeyNeighbor community in ${post.region?.name}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.cover_image ? [getAssetUrl(post.cover_image) || ''] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { region: string; slug: string } }) {
  const post = await getPostBySlug(params.region, params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getPostsByRegion(params.region, 3);
  const otherPosts = relatedPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <nav className="flex items-center text-gray-500 text-sm">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">→</span>
            <Link href={`/${params.region}`} className="hover:text-blue-600">
              {post.region?.name}
            </Link>
            <span className="mx-2">→</span>
            <Link href={`/${params.region}/blog`} className="hover:text-blue-600">
              Blog
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center space-x-4">
              {post.author && (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">
                      {post.author.first_name?.[0]}{post.author.last_name?.[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {post.author.first_name} {post.author.last_name}
                    </div>
                    {post.author.bio && (
                      <div className="text-sm text-gray-500">
                        {post.author.bio.length > 50 
                          ? `${post.author.bio.substring(0, 50)}...`
                          : post.author.bio
                        }
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right">
              {post.published_at && (
                <div className="text-sm text-gray-500">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
              <div className="text-sm text-gray-400 mt-1">
                {post.region?.name}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.cover_image && (
          <div className="mb-12">
            <div className="aspect-video rounded-xl overflow-hidden">
              <Image
                src={getAssetUrl(post.cover_image) || ''}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        {post.content && (
          <div 
            className="prose prose-lg prose-blue max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-lg">
                  {post.author.first_name?.[0]}{post.author.last_name?.[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About {post.author.first_name} {post.author.last_name}
                </h3>
                <p className="text-gray-600">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="flex items-center space-x-4 mb-12">
          <span className="text-gray-600 font-medium">Share this story:</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Twitter
          </button>
          <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors text-sm">
            Facebook
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            WhatsApp
          </button>
        </div>
      </article>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              More from {post.region?.name}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <Link href={`/${params.region}/blog/${relatedPost.slug}`}>
                    {relatedPost.cover_image && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                          src={getAssetUrl(relatedPost.cover_image) || ''}
                          alt={relatedPost.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {relatedPost.title}
                    </h3>
                    
                    {relatedPost.excerpt && (
                      <p className="text-gray-600 mb-3 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500">
                      {relatedPost.author && (
                        <span>
                          By {relatedPost.author.first_name} {relatedPost.author.last_name}
                        </span>
                      )}
                      {relatedPost.published_at && (
                        <span className="ml-2">
                          • {new Date(relatedPost.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                href={`/${params.region}/blog`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All {post.region?.name} Stories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Connect with Your {post.region?.name} Community?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join HeyNeighbor and start building meaningful connections in your neighborhood.
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
              ← Back to {post.region?.name} Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
