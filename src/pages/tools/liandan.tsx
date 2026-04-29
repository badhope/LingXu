import SubPageTemplate from '@/components/layout/SubPageTemplate'
import LiandanPanel from '@/tools/liandan/LiandanPanel'

export default function LiandanPage() {
  return (
    <SubPageTemplate title="炼丹模拟器" colorRgb="234, 88, 12">
      <LiandanPanel />
    </SubPageTemplate>
  )
}
