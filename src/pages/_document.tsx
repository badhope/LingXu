/**
 * 灵墟 - 文档入口
 */

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0f" />
        {/* manifest.json 路径：dev 环境用根路径，生产环境用 /LingXu/ */}
        <link
          rel="manifest"
          href={process.env.NODE_ENV === 'production' ? '/LingXu/manifest.json' : '/manifest.json'}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
