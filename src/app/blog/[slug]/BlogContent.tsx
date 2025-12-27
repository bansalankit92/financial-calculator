'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface BlogContentProps {
  slug: string;
}

export default function BlogContent({ slug }: BlogContentProps) {
  // Dynamically import blog content
  const BlogComponent = dynamic(
    () => import(`@/content/blogs/${slug}`).catch(() => {
      return { default: () => <div>Blog content not found</div> };
    }),
    {
      loading: () => (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      ),
    }
  );

  return <BlogComponent />;
}
