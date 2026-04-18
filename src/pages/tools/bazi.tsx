import Layout from '@/components/layout/Layout'
import BaziPanel from '@/tools/bazi/BaziPanel'

export default function BaziPage() {
  return (
    <Layout title="八字命理" transparentNav parentPath="/tools">
      <BaziPanel />
    </Layout>
  )
}
