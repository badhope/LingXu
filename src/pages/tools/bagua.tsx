import SubPageTemplate from '@/components/layout/SubPageTemplate'
import CoinCasting from '@/tools/bagua/CoinCasting'

export default function BaguaPage() {
  return (
    <SubPageTemplate title="八卦占卜" colorRgb="212, 175, 55">
      <CoinCasting />
    </SubPageTemplate>
  )
}
