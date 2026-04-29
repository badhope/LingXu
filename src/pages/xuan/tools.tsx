'use client'

import { useState } from 'react'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import MeihuaPanel from '@/tools/divination/MeihuaPanel'
import QimenPanel from '@/tools/divination/QimenPanel'
import styles from '@/pages/xuan/index.module.scss'

const TOOLS = [
  { id: 'meihua', name: '梅花易数', icon: '🌸', desc: '八卦起卦占卜' },
  { id: 'qimen', name: '奇门遁甲', icon: '🌀', desc: '九宫排盘分析' },
]

export default function XuanToolsPage() {
  const [activeTool, setActiveTool] = useState('meihua')

  return (
    <SubPageTemplate title="玄学工具" colorRgb="212, 175, 55">
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

      {activeTool === 'meihua' && <MeihuaPanel />}
      {activeTool === 'qimen' && <QimenPanel />}
    </SubPageTemplate>
  )
}
