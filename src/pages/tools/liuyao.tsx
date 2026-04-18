import Layout from '@/components/layout/Layout'
import LiuyaoCast from '@/tools/liuyao/LiuyaoCast'

export default function LiuyaoPage() {
  return (
    <Layout title="六爻断事" transparentNav parentPath="/tools">
      <LiuyaoCast />
    </Layout>
  )
}
