import { Metadata } from 'next';

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  pageType?: 'calculator' | 'article' | 'homepage';
  calculatorType?: 'SIP' | 'EMI' | 'FD' | 'RD';
}

const BASE_URL = 'https://fincalculator.in';
const DEFAULT_OG_IMAGE = '/assets/img/main-image.jpg';

// Define calculator-specific features and benefits
const calculatorFeatures = {
  SIP: {
    features: [
      'Calculate SIP returns',
      'Estimate wealth growth',
      'Plan investment goals',
      'Compound interest visualization',
      'Monthly investment planning'
    ],
    benefits: [
      'Understand the power of compounding',
      'Plan long-term investments',
      'Track investment growth',
      'Optimize monthly savings',
      'Achieve financial goals'
    ],
    inputs: [
      'Monthly investment amount',
      'Expected return rate',
      'Investment duration',
      'Investment frequency'
    ]
  },
  EMI: {
    features: [
      'Calculate monthly EMI',
      'Loan amortization schedule',
      'Total interest calculation',
      'Loan breakup visualization',
      'Prepayment impact analysis'
    ],
    benefits: [
      'Plan loan repayment',
      'Compare different loan options',
      'Understand interest costs',
      'Budget monthly expenses',
      'Evaluate prepayment benefits'
    ],
    inputs: [
      'Loan amount',
      'Interest rate',
      'Loan tenure',
      'Prepayment options'
    ]
  },
  FD: {
    features: [
      'Calculate FD maturity amount',
      'Interest payout estimation',
      'Tax implications',
      'Compare FD rates',
      'Return visualization'
    ],
    benefits: [
      'Plan fixed deposits',
      'Compare different banks',
      'Understand tax impact',
      'Maximize returns',
      'Schedule renewals'
    ],
    inputs: [
      'Principal amount',
      'Interest rate',
      'Deposit duration',
      'Interest payout frequency'
    ]
  },
  RD: {
    features: [
      'Calculate RD maturity amount',
      'Monthly deposit planning',
      'Interest computation',
      'Growth visualization',
      'Goal tracking'
    ],
    benefits: [
      'Plan regular savings',
      'Track deposit growth',
      'Understand returns',
      'Meet financial goals',
      'Compare RD schemes'
    ],
    inputs: [
      'Monthly deposit amount',
      'Interest rate',
      'Deposit duration',
      'Compounding frequency'
    ]
  }
};

function generateCalculatorJsonLd(title: string, description: string, type: string) {
  const calcType = type as keyof typeof calculatorFeatures;
  const features = calculatorFeatures[calcType];

  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title,
      description: description,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1000',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: features.features,
      about: {
        '@type': 'Thing',
        name: `${type} Calculator`,
        description: `Online ${type} calculator for financial planning and analysis`,
        potentialAction: {
          '@type': 'UseAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/${type.toLowerCase()}`,
            description: `Use ${type} Calculator`,
            httpMethod: ['GET', 'POST']
          }
        }
      },
      audience: {
        '@type': 'Audience',
        audienceType: 'Financial planners, Investors, and individuals planning their finances',
        geographicArea: {
          '@type': 'Country',
          name: 'India'
        }
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Organization',
          name: 'Financial Calculator'
        },
        reviewBody: features.benefits.join('. ') + '.'
      },
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/UseAction',
        userInteractionCount: '100000+'
      },
      educationalUse: 'Financial Planning',
      keywords: features.features.concat(features.benefits).join(', '),
      requirements: {
        '@type': 'RequiredInputs',
        name: 'Calculator Inputs',
        description: 'Required inputs for calculation',
        requiredInputs: features.inputs
      },
      maintainer: {
        '@type': 'Organization',
        name: 'Financial Calculator',
        url: BASE_URL
      },
      isAccessibleForFree: true,
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      availableOnDevice: 'All devices with a modern web browser',
      permissions: 'No special permissions required'
    }),
  };
}

function generateArticleJsonLd(title: string, description: string, url: string) {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: title,
      description: description,
      image: `${BASE_URL}${DEFAULT_OG_IMAGE}`,
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'Financial Calculator',
        url: BASE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: 'Financial Calculator',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/assets/icons/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      articleBody: description,
      articleSection: 'Financial Tools',
      keywords: 'financial calculator, investment tools, finance planning',
      inLanguage: 'en-IN',
      isFamilyFriendly: true,
      audience: {
        '@type': 'Audience',
        audienceType: 'Financial planners and investors'
      },
      accessMode: ['textual', 'visual'],
      accessibilityFeature: [
        'highContrastDisplay',
        'readingOrder',
        'structuralNavigation',
        'tableOfContents',
        'alternativeText'
      ],
      accessibilityHazard: 'none'
    }),
  };
}

function generateOrganizationJsonLd() {
  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Financial Calculator',
      url: BASE_URL,
      logo: `${BASE_URL}/assets/icons/logo.png`,
      sameAs: [
        'https://twitter.com/fincalculator',
        'https://facebook.com/fincalculator',
        'https://linkedin.com/company/fincalculator'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@fincalculator.in',
        availableLanguage: ['English', 'Hindi']
      },
      description: 'Free online financial calculators for SIP, EMI, FD, and RD calculations',
      foundingDate: '2024',
      knowsAbout: [
        'Financial Planning',
        'Investment Calculations',
        'Mutual Funds',
        'Fixed Deposits',
        'Loan EMI'
      ],
      areaServed: {
        '@type': 'Country',
        name: 'India'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
          description: 'Search Financial Calculator'
        },
        'query-input': 'required name=search_term_string'
      }
    }),
  };
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  pageType = 'calculator',
  calculatorType,
}: PageMetadataProps): Metadata {
  const metaTitle = `${title} | Financial Calculator`;
  const metaDescription = description;
  const url = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;
  const ogImageUrl = `${BASE_URL}${DEFAULT_OG_IMAGE}`;

  // Generate appropriate JSON-LD based on page type
  let jsonLd;
  if (pageType === 'calculator' && calculatorType) {
    jsonLd = generateCalculatorJsonLd(title, description, calculatorType);
  } else if (pageType === 'article') {
    jsonLd = generateArticleJsonLd(title, description, url);
  } else if (pageType === 'homepage') {
    jsonLd = generateOrganizationJsonLd();
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: [
        { url: '/assets/icons/favicon.ico' },
        { url: '/assets/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/assets/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/assets/icons/apple-touch-icon.png' },
      ],
    },
    manifest: '/assets/icons/site.webmanifest',
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: url,
      siteName: 'Financial Calculator',
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'application-name': 'Financial Calculator',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Financial Calculator',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-config': '/assets/icons/browserconfig.xml',
      'msapplication-TileColor': '#2B5797',
      'msapplication-tap-highlight': 'no',
      'theme-color': '#FFFFFF',
    },
    verification: {
      google: 'your-verification-code', // Add your actual verification code
    },
    ...(jsonLd && {
      other: {
        'script:ld+json': jsonLd.__html,
      },
    }),
  };
} 