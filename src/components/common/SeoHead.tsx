import Head from 'next/head'

interface SeoHeadProps {
  title: string
  description?: string
  keywords?: string
}

/**
 * 🔮 SEO 头部组件
 * 为每个页面设置独立的标题、描述、关键词
 * 统一管理全站 meta 标签
 */
export default function SeoHead({
  title,
  description = '灵墟档案馆 - 末法时代失落修行文明档案馆，收录中华玄学、历史、天文、地理等修真文化',
  keywords = '修仙,玄学,易经,八字,风水,星宿,历史,修真,传统文化'
}: SeoHeadProps) {
  const fullTitle = `${title} | 灵墟档案馆`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}
