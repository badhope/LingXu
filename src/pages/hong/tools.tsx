'use client'

import SubPageTemplate from '@/components/layout/SubPageTemplate'
import CreaturePanel from '@/tools/honghuang/CreaturePanel'

export default function HongToolsPage() {
  return (
    <SubPageTemplate title="山海经异兽录" colorRgb="124, 58, 237">
      <CreaturePanel />
    </SubPageTemplate>
  )
}
