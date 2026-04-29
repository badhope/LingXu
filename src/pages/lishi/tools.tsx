'use client'

import { useState } from 'react'
import SubPageTemplate from '@/components/layout/SubPageTemplate'
import TimelinePanel from '@/tools/history/TimelinePanel'
import RelationPanel from '@/tools/history/RelationPanel'

const TOOLS = [
  { id: 'timeline', name: '历史时间轴', icon: '⏳', desc: '中华五千年王朝更迭' },
  { id: 'relation', name: '人物关系图', icon: '🕸️', desc: '历史人物关系网络' },
]

export default function ShiToolsPage() {
  const [activeTool, setActiveTool] = useState('timeline')

  return (
    <SubPageTemplate title="历史工具" colorRgb="212, 175, 55">
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: activeTool === tool.id ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${activeTool === tool.id ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255,255,255,0.1)'}`,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tool.icon} {tool.name}
          </button>
        ))}
      </div>
      {activeTool === 'timeline' && <TimelinePanel />}
      {activeTool === 'relation' && <RelationPanel />}
    </SubPageTemplate>
  )
}
