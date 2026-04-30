import ComingSoonTemplate from '@/components/layout/ComingSoonTemplate'

export default function MoFaPage() {
  return (
    <ComingSoonTemplate
      title="末法时代"
      subtitle="灵气消散后的现代修行世界，正在精心构建中..."
      icon="🌆"
      colorRgb="6, 182, 212"
      parentPath="/home"
      features={[
        '末法调查局 - 灵气消失之谜',
        '都市异闻录 - 现代奇人异事',
        '灵气复苏 - 觉醒者档案',
        '隐世宗门 - 传承寻踪',
      ]}
    />
  )
}
