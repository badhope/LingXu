'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'
import FilterBar from '@/components/common/FilterBar'

interface Constellation {
  name: string
  palace: string
  desc: string
  element: string
  animal: string
  lucky: string[]
  unlucky: string[]
  detail: string
}

const CONSTELLATIONS: Constellation[] = [
  { name: '角木蛟', palace: '东宫青龙', element: '木', animal: '蛟', desc: '苍龙之首，主造化生杀', lucky: ['嫁娶', '造葬', '开业'], unlucky: ['动土', '搬家'], detail: '角宿星君主人间雨泽、大臣迁官、庶人蚕桑。角宿二星为天关，其间为天门，日月五星之所由也。' },
  { name: '亢金龙', palace: '东宫青龙', element: '金', animal: '龙', desc: '苍龙颈喉，主庙堂祭祀', lucky: ['祭祀', '祈福', '求子'], unlucky: ['诉讼', '求医'], detail: '亢宿四星为宗庙，又为疏庙，主疾病。亢宿明则君臣同心，天下太平。' },
  { name: '氐土貉', palace: '东宫青龙', element: '土', animal: '貉', desc: '苍龙胸膈，主疾病灾厄', lucky: ['安葬', '祈福', '安床'], unlucky: ['嫁娶', '开市'], detail: '氐宿四星为天根，主疫疾。氐宿动摇则有兵起，天下多疫。' },
  { name: '房日兔', palace: '东宫青龙', element: '日', animal: '兔', desc: '苍龙腹房，主御膳房事', lucky: ['嫁娶', '纳采', '安床'], unlucky: ['动土', '修造'], detail: '房宿四星为明堂，天子布政之宫，亦为四辅。房宿明则王者行正道，天下和平。' },
  { name: '心月狐', palace: '东宫青龙', element: '月', animal: '狐', desc: '苍龙心脏，主帝王明堂', lucky: ['朝见', '封爵', '委任'], unlucky: ['出军', '围猎'], detail: '心宿三星为天王正位，中星为天子，前星为太子，后星为庶子。心宿明则五谷丰登。' },
  { name: '尾火虎', palace: '东宫青龙', element: '火', animal: '虎', desc: '苍龙虎尾，主后妃子嗣', lucky: ['嫁娶', '纳妃', '求子'], unlucky: ['修造', '动土'], detail: '尾宿九星为后宫，主后妃夫人。尾宿九星明，则后妃有序，子孙蕃昌。' },
  { name: '箕水豹', palace: '东宫青龙', element: '水', animal: '豹', desc: '苍龙末梢，主风雨口舌', lucky: ['祭祀', '祈雨', '远行'], unlucky: ['嫁娶', '口舌'], detail: '箕宿四星为天口，主口舌，亦为风伯。箕宿四星明，风雨顺时，岁稔年丰。' },
  { name: '斗木獬', palace: '北宫玄武', element: '木', animal: '獬', desc: '玄武之首，主斟酌权衡', lucky: ['科考', '求官', '断案'], unlucky: ['嫁娶', '纳财'], detail: '斗宿六星为天府，又为天庙，主宰相爵禄。南斗六星，主天子寿命，亦主宰相爵禄之位。' },
  { name: '牛金牛', palace: '北宫玄武', element: '金', animal: '牛', desc: '玄武牛宿，主牺牲祭祀', lucky: ['祭祀', '造畜', '纳财'], unlucky: ['嫁娶', '出行'], detail: '牛宿六星为天关，主牺牲事。牛宿明则阴阳调和，六畜蕃息，五谷丰收。' },
  { name: '女土蝠', palace: '北宫玄武', element: '土', animal: '蝠', desc: '玄武女宿，主裁缝嫁娶', lucky: ['嫁娶', '裁缝', '手工艺'], unlucky: ['修造', '动土'], detail: '女宿四星为婺女，主布帛裁制嫁娶。女宿明则妇女贤良，女工精巧。' },
  { name: '虚日鼠', palace: '北宫玄武', element: '日', animal: '鼠', desc: '玄武虚宿，主坟墓哭泣', lucky: ['安葬', '吊唁', '祭祀'], unlucky: ['嫁娶', '开业'], detail: '虚宿二星为冢宰，主哭泣祷祀。虚宿主死丧哭泣，又为邑居庙堂祭祀。' },
  { name: '危月燕', palace: '北宫玄武', element: '月', animal: '燕', desc: '玄武危宿，主殿堂屋宇', lucky: ['修造', '盖屋', '竖柱'], unlucky: ['嫁娶', '出行'], detail: '危宿三星主庙堂祭祀、天文、会计。危宿三星明，则天下安宁，宗庙兴盛。' },
  { name: '室火猪', palace: '北宫玄武', element: '火', animal: '猪', desc: '玄武室宿，主营筑军粮', lucky: ['筑城', '造仓', '屯兵'], unlucky: ['嫁娶', '入宅'], detail: '室宿二星为营室，主军粮，亦为宗庙。室宿明则国富民安，仓库充实。' },
  { name: '壁水貐', palace: '北宫玄武', element: '水', animal: '貐', desc: '玄武壁宿，主文章秘籍', lucky: ['科举', '著书', '藏书'], unlucky: ['动土', '嫁娶'], detail: '壁宿二星为图书秘府，主文章。壁宿明则道术行，君子兴，文章大盛。' },
  { name: '奎木狼', palace: '西宫白虎', element: '木', animal: '狼', desc: '白虎之首，主兵戈武库', lucky: ['出军', '围猎', '练武'], unlucky: ['嫁娶', '文官'], detail: '奎宿十六星为天豕，亦曰封豕，主武库兵戈。奎宿主文章、武库、天下之兵。' },
  { name: '娄金狗', palace: '西宫白虎', element: '金', animal: '狗', desc: '白虎娄宿，主苑牧牺牲', lucky: ['祭祀', '收猎', '纳畜'], unlucky: ['出行', '嫁娶'], detail: '娄宿三星为苑牧，主牺牲祭祀之事。娄宿三星明，则郊祀大典，六畜蕃息。' },
  { name: '胃土雉', palace: '西宫白虎', element: '土', animal: '雉', desc: '白虎胃宿，主仓廪五谷', lucky: ['开仓', '纳粮', '囤积'], unlucky: ['放债', '布施'], detail: '胃宿三星为仓廪，主五谷。胃宿三星明，则天下和平，五谷丰登，仓库充实。' },
  { name: '昴日鸡', palace: '西宫白虎', element: '日', animal: '鸡', desc: '白虎昴宿，主丧狱狱事', lucky: ['断狱', '处决', '祭祀'], unlucky: ['嫁娶', '开业'], detail: '昴宿七星为旄头，主丧狱。昴宿明则天下牢狱平，无冤狱。' },
  { name: '毕月乌', palace: '西宫白虎', element: '月', animal: '乌', desc: '白虎毕宿，主弋猎田狩', lucky: ['狩猎', '布阵', '出游'], unlucky: ['词讼', '嫁娶'], detail: '毕宿八星为边兵，主弋猎。毕宿八星明，则天下安，边境宁，四夷来朝。' },
  { name: '觜火猴', palace: '西宫白虎', element: '火', animal: '猴', desc: '白虎觜宿，主收敛成熟', lucky: ['收获', '收藏', '结账'], unlucky: ['开张', '放债'], detail: '觜宿三星为万物之聚敛，主收敛成熟。觜宿三星明，则秋收冬藏，府库充实。' },
  { name: '参水猿', palace: '西宫白虎', element: '水', animal: '猿', desc: '白虎参宿，主斩杀杀伐', lucky: ['出军', '讨逆', '除暴'], unlucky: ['和亲', '议和'], detail: '参宿七星为斩刈，主杀伐。参宿七星明，则大将成功，奸臣伏诛，天下清。' },
  { name: '井水犴', palace: '南宫朱雀', element: '木', animal: '犴', desc: '朱雀之首，主泉源水利', lucky: ['挖井', '修渠', '渔猎'], unlucky: ['火攻', '焚化'], detail: '井宿八星为水事，主泉源。井宿八星明，则天下水利通，人民富足。' },
  { name: '鬼金羊', palace: '南宫朱雀', element: '金', animal: '羊', desc: '朱雀鬼宿，主祠祀死丧', lucky: ['祭祀', '超度', '安葬'], unlucky: ['婚嫁', '吉庆'], detail: '鬼宿四星为天目，主祠祀死丧。鬼宿四星明，则鬼神顺，祠祀灵验。' },
  { name: '柳土獐', palace: '南宫朱雀', element: '土', animal: '獐', desc: '朱雀柳宿，主庖厨饮食', lucky: ['宴会', '烹饪', '饮食'], unlucky: ['服药', '疗疾'], detail: '柳宿八星为厨宰，主庖厨饮食。柳宿八星明，则食禄丰厚，饮食丰美。' },
  { name: '星日马', palace: '南宫朱雀', element: '日', animal: '马', desc: '朱雀星宿，主急盗忧患', lucky: ['缉盗', '破案', '除害'], unlucky: ['出游', '嫁娶'], detail: '星宿七星为玄戈，主盗贼。星宿七星明，则盗贼息，国安民泰。' },
  { name: '张月鹿', palace: '南宫朱雀', element: '月', animal: '鹿', desc: '朱雀张宿，主珍宝宗庙', lucky: ['藏宝', '鉴宝', '宗庙'], unlucky: ['分家', '散财'], detail: '张宿六星为天府，主珍宝宗庙之用。张宿六星明，则天府充盈，珍宝毕现。' },
  { name: '翼火蛇', palace: '南宫朱雀', element: '火', animal: '蛇', desc: '朱雀翼宿，主远客文辞', lucky: ['迎宾', '作文', '书画'], unlucky: ['出军', '征战'], detail: '翼宿二十二星为天乐府，主远客文辞。翼宿明，则远人来贡，文章大盛。' },
  { name: '轸水蚓', palace: '南宫朱雀', element: '水', animal: '蚓', desc: '朱雀轸宿，主车骑风歌', lucky: ['出行', '造车', '音乐'], unlucky: ['动土', '挖井'], detail: '轸宿四星为车骑，主风。轸宿四星明，则车马盛行，音律和谐。' },
]

export default function XingxiuPage() {
  const [filtered, setFiltered] = useState(CONSTELLATIONS)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleFilter = useCallback((data: typeof CONSTELLATIONS) => {
    setFiltered(data)
  }, [])

  return (
    <SubPageTemplate
      title="二十八星宿"
      subtitle="三垣四象 · 二十八宿 · 天星对应 · 天人合一"
      icon="⭐"
      colorRgb="240, 192, 64"
    >
      <SubPageSection title="星宿概述">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            二十八星宿是古代中国天文学家为观测日、月、五星运行而划分的二十八个星区，用来说明日、月、五星运行所到的位置。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            每宿包含若干颗恒星。作为中国传统文化中的重要组成部分之一，曾广泛应用于古代的天文、宗教、文学及星占、星命、风水、择吉等术数中。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title={`二十八宿详解 (${filtered.length}/${CONSTELLATIONS.length})`}>
        {/* 🔍 新增: 搜索 + 四象分类筛选 */}
        <FilterBar
          data={CONSTELLATIONS}
          searchKeys={['name', 'palace', 'element', 'desc']}
          filterOptions={[
            { key: 'palace', label: '四象', allLabel: '全部星宿' },
            { key: 'element', label: '七曜', allLabel: '全部五行' },
          ]}
          onFiltered={handleFilter}
          placeholder="搜索星宿名称、所属星宫..."
        />

        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'rgba(201, 162, 39, 0.5)',
          }}>
            🔮 没有找到符合条件的星宿...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map((star, index) => (
              <motion.div
                key={star.name}
                className="xian-submodule-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.015 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setExpanded(expanded === star.name ? null : star.name)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}>
                  <h3 style={{ color: '#b89438', margin: 0 }}>
                    {star.name}
                  </h3>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: 'rgba(201, 162, 39, 0.1)',
                    color: 'rgba(201, 162, 39, 0.8)',
                  }}>
                    {star.element}
                  </span>
                </div>

                <p style={{
                  color: 'rgba(154, 123, 41, 0.6)',
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem',
                }}>
                  {star.palace} · {star.animal}
                </p>
                <p style={{
                  color: 'rgba(180, 180, 190, 0.7)',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  marginBottom: '0.75rem',
                }}>
                  {star.desc}
                </p>

                {/* 💫 点击展开详情 */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expanded === star.name ? 'auto' : 0,
                    opacity: expanded === star.name ? 1 : 0,
                  }}
                  style={{ overflow: 'hidden' }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(201, 162, 39, 0.1)',
                  }}>
                    <p style={{
                      color: 'rgba(180, 180, 190, 0.6)',
                      fontSize: '0.8rem',
                      lineHeight: 1.7,
                      marginBottom: '0.75rem',
                      fontStyle: 'italic',
                    }}>
                      {star.detail}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>✅ 宜: </span>
                        {star.lucky.map(x => (
                          <span key={x} style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.4rem',
                            marginRight: '0.25rem',
                            borderRadius: '3px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: 'rgba(34, 197, 94, 0.8)',
                          }}>{x}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                      <div>
                        <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>❌ 忌: </span>
                        {star.unlucky.map(x => (
                          <span key={x} style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.4rem',
                            marginRight: '0.25rem',
                            borderRadius: '3px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: 'rgba(239, 68, 68, 0.8)',
                          }}>{x}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 展开指示器 */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  color: 'rgba(201, 162, 39, 0.4)',
                  fontSize: '0.75rem',
                }}>
                  {expanded === star.name ? '▲ 收起详情' : '▼ 点击查看详情'}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </SubPageSection>
    </SubPageTemplate>
  )
}
