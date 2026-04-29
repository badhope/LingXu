import SubPageTemplate from '@/components/layout/SubPageTemplate'
import LiuyaoCast from '@/tools/liuyao/LiuyaoCast'

export default function LiuyaoPage() {
  return (
    <SubPageTemplate title="六爻起卦" colorRgb="168, 85, 247">
      <LiuyaoCast />
    </SubPageTemplate>
  )
}
