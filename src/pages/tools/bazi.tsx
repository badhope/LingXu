import SubPageTemplate from '@/components/layout/SubPageTemplate'
import BaziPanel from '@/tools/bazi/BaziPanel'

export default function BaziPage() {
  return (
    <SubPageTemplate title="八字命理" colorRgb="234, 88, 12">
      <BaziPanel />
    </SubPageTemplate>
  )
}
