import { BlogMetadata, Blog } from '@/types/blog';

// Blog registry - Central source of truth for all blogs
// Add new blogs here as they are created

const blogRegistry: BlogMetadata[] = [
  {
    slug: 'emi-home-loan-calculator',
    title: 'EMI Home Loan Calculator: Smart Strategies vs Emotional Decisions',
    description: 'Understand how banks structure home loans, compare EMI vs investment strategies, and make data-driven decisions about homeownership in India.',
    excerpt: 'Learn why buying a home might not always be the best investment decision. Explore alternative strategies and understand the true cost of home loans.',
    category: 'Home Loans',
    publishedDate: '27/12/2024',
    author: {
      name: 'FinCalculator Team',
      role: 'Financial Analysis',
    },
    readTime: 8,
    tags: ['EMI Calculator', 'Home Loan', 'Investment', 'Real Estate', 'Financial Planning'],
    ogImage: '/blog/emi-home-loan-calculator/og.svg',
    featured: true,
  },
];

// Helper functions

/**
 * Get all blogs sorted by published date (newest first)
 */
export function getAllBlogs(): BlogMetadata[] {
  return [...blogRegistry].sort((a, b) => {
    const dateA = parseIndianDate(a.publishedDate);
    const dateB = parseIndianDate(b.publishedDate);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single blog by slug
 */
export function getBlogBySlug(slug: string): BlogMetadata | undefined {
  return blogRegistry.find((blog) => blog.slug === slug);
}

/**
 * Get blogs by category
 */
export function getBlogsByCategory(category: string): BlogMetadata[] {
  return getAllBlogs().filter((blog) => blog.category === category);
}

/**
 * Get featured blogs
 */
export function getFeaturedBlogs(): BlogMetadata[] {
  return getAllBlogs().filter((blog) => blog.featured);
}

/**
 * Get blogs by tag
 */
export function getBlogsByTag(tag: string): BlogMetadata[] {
  return getAllBlogs().filter((blog) =>
    blog.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(blogRegistry.map((blog) => blog.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set(blogRegistry.flatMap((blog) => blog.tags));
  return Array.from(tags).sort();
}

/**
 * Search blogs by title, description, or tags
 */
export function searchBlogs(query: string): BlogMetadata[] {
  const lowerQuery = query.toLowerCase();
  return getAllBlogs().filter((blog) =>
    blog.title.toLowerCase().includes(lowerQuery) ||
    blog.description.toLowerCase().includes(lowerQuery) ||
    blog.excerpt.toLowerCase().includes(lowerQuery) ||
    blog.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get related blogs based on tags and category
 */
export function getRelatedBlogs(currentSlug: string, limit: number = 3): BlogMetadata[] {
  const currentBlog = getBlogBySlug(currentSlug);
  if (!currentBlog) return [];

  const allBlogs = getAllBlogs().filter((blog) => blog.slug !== currentSlug);

  // Score blogs based on matching tags and category
  const scoredBlogs = allBlogs.map((blog) => {
    let score = 0;

    // Same category gets 2 points
    if (blog.category === currentBlog.category) {
      score += 2;
    }

    // Each matching tag gets 1 point
    const matchingTags = blog.tags.filter((tag) =>
      currentBlog.tags.includes(tag)
    );
    score += matchingTags.length;

    return { blog, score };
  });

  // Sort by score and return top N
  return scoredBlogs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.blog);
}

/**
 * Parse Indian date format (DD/MM/YYYY) to Date object
 */
function parseIndianDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format date for display
 */
export function formatDisplayDate(dateStr: string): string {
  const date = parseIndianDate(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-IN', options);
}

/**
 * Get all blog slugs for static generation
 */
export function getAllBlogSlugs(): string[] {
  return blogRegistry.map((blog) => blog.slug);
}
