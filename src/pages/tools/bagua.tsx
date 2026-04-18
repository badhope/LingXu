import Layout from '@/components/layout/Layout'
import CoinCasting from '@/tools/bagua/CoinCasting'

export default function BaguaPage() {
  return (
    <Layout title="八卦占卜" transparentNav parentPath="/tools">
      <CoinCasting />
    </Layout>
  )
}
