import Layout from '@/components/layout/Layout'
import ZhenfaPanel from '@/tools/zhenfa/ZhenfaPanel'

export default function ZhenfaPage() {
  return (
    <Layout title="阵法大全" transparentNav parentPath="/tools">
      <ZhenfaPanel />
    </Layout>
  )
}
