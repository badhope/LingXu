import SubPageTemplate from '@/components/layout/SubPageTemplate'
import ZhenfaPanel from '@/tools/zhenfa/ZhenfaPanel'

export default function ZhenfaPage() {
  return (
    <SubPageTemplate title="阵法模拟" colorRgb="6, 182, 212">
      <ZhenfaPanel />
    </SubPageTemplate>
  )
}
