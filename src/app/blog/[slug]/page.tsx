import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  getAllBlogSlugs,
  getBlogBySlug,
  getRelatedBlogs,
  formatDisplayDate,
} from '@/lib/blog-registry';
import BlogContent from '@/app/blog/[slug]/BlogContent';
import ShareButtons from '@/app/blog/[slug]/ShareButtons';
import ReadingProgress from '@/app/blog/[slug]/ReadingProgress';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blogs
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fincalculator.in';
  const blogUrl = `${siteUrl}/blog/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags.join(', '),
    authors: [{ name: blog.author.name }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: blogUrl,
      siteName: 'FinCalculator.in',
      images: [
        {
          url: `${siteUrl}${blog.ogImage}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: 'en_IN',
      type: 'article',
      publishedTime: blog.publishedDate,
      modifiedTime: blog.updatedDate,
      authors: [blog.author.name],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [`${siteUrl}${blog.ogImage}`],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(slug, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fincalculator.in';
  const blogUrl = `${siteUrl}/blog/${blog.slug}`;

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description,
    image: `${siteUrl}${blog.ogImage}`,
    datePublished: blog.publishedDate,
    dateModified: blog.updatedDate || blog.publishedDate,
    author: {
      '@type': 'Person',
      name: blog.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FinCalculator.in',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
    keywords: blog.tags.join(', '),
    articleSection: blog.category,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRightIcon className="w-4 h-4" />
              <Link
                href="/blog"
                className="hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <ChevronRightIcon className="w-4 h-4" />
              <span className="text-gray-900 font-medium line-clamp-1">
                {blog.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {blog.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              <span className="font-medium">{blog.author.name}</span>
              {blog.author.role && (
                <span className="text-gray-500">• {blog.author.role}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>{formatDisplayDate(blog.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons
            url={blogUrl}
            title={blog.title}
            description={blog.description}
          />

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-600">Loading content...</p>
                  </div>
                </div>
              }
            >
              <BlogContent slug={slug} />
            </Suspense>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.slug}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group"
                  >
                    <article className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                        {relatedBlog.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <ClockIcon className="w-4 h-4" />
                        <span>{relatedBlog.readTime} min read</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
