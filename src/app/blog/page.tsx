'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClockIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';
import { getAllBlogs, getAllCategories, formatDisplayDate } from '@/lib/blog-registry';
import type { BlogMetadata } from '@/types/blog';

const INITIAL_LOAD = 9;
const LOAD_MORE = 6;

export default function BlogListingPage() {
  const [allBlogs] = useState<BlogMetadata[]>(getAllBlogs());
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogMetadata[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [categories] = useState<string[]>(getAllCategories());

  // Filter and slice blogs based on category and visible count
  useEffect(() => {
    const filtered =
      selectedCategory === 'all'
        ? allBlogs
        : allBlogs.filter((blog) => blog.category === selectedCategory);

    setDisplayedBlogs(filtered.slice(0, visibleCount));
  }, [selectedCategory, visibleCount, allBlogs]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 500
      ) {
        setVisibleCount((prev) => prev + LOAD_MORE);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset visible count when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_LOAD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial Planning Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Expert insights, practical strategies, and data-driven advice for
              smarter financial decisions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Filter:
              </span>
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {displayedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No articles found in this category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedBlogs.map((blog, index) => (
                <BlogCard key={blog.slug} blog={blog} index={index} />
              ))}
            </div>

            {/* Loading indicator */}
            {visibleCount < allBlogs.length && (
              <div className="text-center mt-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm mt-4">Loading more articles...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface BlogCardProps {
  blog: BlogMetadata;
  index: number;
}

function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Link href={`/blog/${blog.slug}`}>
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <div className="text-white text-center px-6">
            <TagIcon className="w-12 h-12 mx-auto mb-2 opacity-80" />
            <p className="text-sm font-medium opacity-90">{blog.category}</p>
          </div>
          {blog.featured && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDisplayDate(blog.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
