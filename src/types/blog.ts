export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  publishedDate: string; // DD/MM/YYYY format
  updatedDate?: string; // DD/MM/YYYY format
  author: {
    name: string;
    role?: string;
  };
  readTime: number; // in minutes
  tags: string[];
  ogImage: string; // Path to OG image (1200x630)
  featured?: boolean; // Whether to feature this blog
}

export type BlogCategory =
  | 'Home Loans'
  | 'Investment Strategies'
  | 'Tax Planning'
  | 'Personal Finance'
  | 'SIP & Mutual Funds'
  | 'Loans & EMI';

export interface BlogCard {
  metadata: BlogMetadata;
  thumbnail: string;
}

export interface Blog {
  metadata: BlogMetadata;
  content: React.ComponentType;
}

export interface BlogContentProps {
  className?: string;
}
