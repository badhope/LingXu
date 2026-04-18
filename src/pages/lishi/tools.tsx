'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import TimelinePanel from '@/tools/history/TimelinePanel'
import RelationPanel from '@/tools/history/RelationPanel'

const TOOLS = [
  { id: 'timeline', name: '历史时间轴', icon: '⏳', desc: '中华五千年王朝更迭' },
  { id: 'relation', name: '人物关系图', icon: '🕸️', desc: '历史人物关系网络' },
]

export default function ShiToolsPage() {
  const [activeTool, setActiveTool] = useState('timeline')

  return (
    <Layout title="史部工具 - 以史为鉴" parentPath="/lishi">
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        justifyContent: 'center', 
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            style={{
              padding: '12px 28px',
              background: activeTool === tool.id ? 'linear-gradient(135deg, #d4af37, #b8941f)' : 'rgba(0,0,0,0.4)',
              border: '2px solid',
              borderColor: activeTool === tool.id ? '#d4af37' : '#4a3a2a',
              borderRadius: 50,
              color: activeTool === tool.id ? '#1a1510' : '#fff',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTool === tool.id ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
            }}
          >
            {tool.icon} {tool.name}
          </button>
        ))}
      </div>

      {activeTool === 'timeline' && <TimelinePanel />}
      {activeTool === 'relation' && <RelationPanel />}
    </Layout>
  )
}
