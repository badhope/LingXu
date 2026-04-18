import Layout from '@/components/layout/Layout'
import LiandanPanel from '@/tools/liandan/LiandanPanel'

export default function LiandanPage() {
  return (
    <Layout title="丹药养生" transparentNav parentPath="/tools">
      <LiandanPanel />
    </Layout>
  )
}
