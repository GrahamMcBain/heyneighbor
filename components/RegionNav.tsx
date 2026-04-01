import Link from 'next/link';
import { getRegions } from '@/lib/directus';

export default async function RegionNav() {
  const regions = await getRegions();

  if (regions.length === 0) {
    return null;
  }

  return (
    <nav className="bg-gray-50 border-b">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Regional Chapters:
          </span>
          
          <div className="flex items-center space-x-6">
            {regions.map((region) => (
              <Link
                key={region.id}
                href={`/${region.slug}`}
                className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
