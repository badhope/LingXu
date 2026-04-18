import Layout from '@/components/layout/Layout'
import XingxiuPanel from '@/tools/xingxiu/XingxiuPanel'

export default function XingxiuPage() {
  return (
    <Layout title="星象观测" transparentNav parentPath="/tools">
      <XingxiuPanel />
    </Layout>
  )
}
