import Layout from '@/components/layout/Layout'
import LuopanInteractive from '@/tools/luopan/LuopanInteractive'

export default function LuopanPage() {
  return (
    <Layout title="风水罗盘" transparentNav parentPath="/tools">
      <LuopanInteractive />
    </Layout>
  )
}
