'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import FortuneDraw from '@/tools/fortune/FortuneDraw'
import ShichenPanel from '@/tools/fortune/ShichenPanel'
import styles from '@/pages/tian/index.module.scss'

const TOOLS = [
  { id: 'fortune', name: '观音灵签', icon: '🎋', desc: '每日运势抽签' },
  { id: 'shichen', name: '时辰吉凶', icon: '⏰', desc: '十二时辰查询' },
]

export default function TianToolsPage() {
  const [activeTool, setActiveTool] = useState('fortune')

  return (
    <Layout title="天部工具 - 运势占卜" parentPath="/tian">
      <div className={styles.toolbar} style={{ marginBottom: 24 }}>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            className={`${styles.templateBtn} ${activeTool === tool.id ? styles.active : ''}`}
            onClick={() => setActiveTool(tool.id)}
            style={{ padding: '12px 24px' }}
          >
            {tool.icon} {tool.name}
          </button>
        ))}
      </div>

      {activeTool === 'fortune' && <FortuneDraw />}
      {activeTool === 'shichen' && <ShichenPanel />}
    </Layout>
  )
}
