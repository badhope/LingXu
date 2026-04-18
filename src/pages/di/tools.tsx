'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import HouseFengshui from '@/tools/fengshui/HouseFengshui'
import LongmaiPanel from '@/tools/longmai/LongmaiPanel'
import styles from '@/pages/di/index.module.scss'

const TOOLS = [
  { id: 'house', name: '阳宅风水', icon: '🏠', desc: '户型风水专业分析' },
  { id: 'longmai', name: '寻龙点穴', icon: '🐉', desc: '龙脉地图穴位探查' },
]

export default function DiToolsPage() {
  const [activeTool, setActiveTool] = useState('house')

  return (
    <Layout title="地部工具 - 风水堪舆" parentPath="/di">
      <div className={styles.toolbar} style={{ marginBottom: 24 }}>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            className={`${styles.templateBtn} ${activeTool === tool.id ? styles.active : ''}`}
            onClick={() => setActiveTool(tool.id)}
          >
            {tool.icon} {tool.name}
          </button>
        ))}
      </div>

      {activeTool === 'house' && <HouseFengshui />}
      {activeTool === 'longmai' && <LongmaiPanel />}
    </Layout>
  )
}
