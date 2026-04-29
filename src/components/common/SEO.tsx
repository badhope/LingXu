import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image'
  keywords?: string[]
  author?: string
  noindex?: boolean
}

const DEFAULT_SEO = {
  title: '灵墟 - 修真文化探索平台',
  description: '踏入灵墟，探索修真文化的奥秘。天时、地理、玄学、丹道、阵法，开启你的修真之旅。',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  keywords: ['修真', '玄学', '周易', '八卦', '炼丹', '阵法', '灵墟', '道家', '修仙'],
  author: '灵墟',
}

export function SEO({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  canonical,
  ogImage,
  ogType = DEFAULT_SEO.ogType,
  twitterCard = DEFAULT_SEO.twitterCard,
  keywords = DEFAULT_SEO.keywords,
  author = DEFAULT_SEO.author,
  noindex = false,
}: SEOProps) {
  const fullTitle = title === DEFAULT_SEO.title ? title : `${title} | 灵墟`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="灵墟" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <meta property="og:url" content={canonical} />}
      
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      <meta name="theme-color" content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '灵墟',
            url: 'https://lingxu.app',
            description: description,
            author: {
              '@type': 'Person',
              name: author,
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://lingxu.app/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </Head>
  )
}
