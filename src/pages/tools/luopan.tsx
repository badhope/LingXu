import SubPageTemplate from '@/components/layout/SubPageTemplate'
import LuopanInteractive from '@/tools/luopan/LuopanInteractive'

export default function LuopanPage() {
  return (
    <SubPageTemplate title="风水罗盘" colorRgb="34, 197, 94">
      <LuopanInteractive />
    </SubPageTemplate>
  )
}
