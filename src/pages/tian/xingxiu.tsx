'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const CONSTELLATIONS = [
  { name: '角木蛟', palace: '东宫青龙', desc: '苍龙之首，主造化生杀' },
  { name: '亢金龙', palace: '东宫青龙', desc: '苍龙颈喉，主庙堂祭祀' },
  { name: '氐土貉', palace: '东宫青龙', desc: '苍龙胸膈，主疾病灾厄' },
  { name: '房日兔', palace: '东宫青龙', desc: '苍龙腹房，主御膳房事' },
  { name: '心月狐', palace: '东宫青龙', desc: '苍龙心脏，主帝王明堂' },
  { name: '尾火虎', palace: '东宫青龙', desc: '苍龙虎尾，主后妃子嗣' },
  { name: '箕水豹', palace: '东宫青龙', desc: '苍龙末梢，主风雨口舌' },
  { name: '斗木獬', palace: '北宫玄武', desc: '玄武之首，主斟酌权衡' },
  { name: '牛金牛', palace: '北宫玄武', desc: '玄武牛宿，主牺牲祭祀' },
  { name: '女土蝠', palace: '北宫玄武', desc: '玄武女宿，主裁缝嫁娶' },
  { name: '虚日鼠', palace: '北宫玄武', desc: '玄武虚宿，主坟墓哭泣' },
  { name: '危月燕', palace: '北宫玄武', desc: '玄武危宿，主殿堂屋宇' },
  { name: '室火猪', palace: '北宫玄武', desc: '玄武室宿，主营筑军粮' },
  { name: '壁水貐', palace: '北宫玄武', desc: '玄武壁宿，主文章秘籍' },
  { name: '奎木狼', palace: '西宫白虎', desc: '白虎之首，主兵戈武库' },
  { name: '娄金狗', palace: '西宫白虎', desc: '白虎娄宿，主苑牧牺牲' },
  { name: '胃土雉', palace: '西宫白虎', desc: '白虎胃宿，主仓廪五谷' },
  { name: '昴日鸡', palace: '西宫白虎', desc: '白虎昴宿，主丧狱狱事' },
  { name: '毕月乌', palace: '西宫白虎', desc: '白虎毕宿，主弋猎田狩' },
  { name: '觜火猴', palace: '西宫白虎', desc: '白虎觜宿，主收敛成熟' },
  { name: '参水猿', palace: '西宫白虎', desc: '白虎参宿，主斩杀杀伐' },
  { name: '井水犴', palace: '南宫朱雀', desc: '朱雀之首，主泉源水利' },
  { name: '鬼金羊', palace: '南宫朱雀', desc: '朱雀鬼宿，主祠祀死丧' },
  { name: '柳土獐', palace: '南宫朱雀', desc: '朱雀柳宿，主庖厨饮食' },
  { name: '星日马', palace: '南宫朱雀', desc: '朱雀星宿，主急盗忧患' },
  { name: '张月鹿', palace: '南宫朱雀', desc: '朱雀张宿，主珍宝宗庙' },
  { name: '翼火蛇', palace: '南宫朱雀', desc: '朱雀翼宿，主远客文辞' },
  { name: '轸水蚓', palace: '南宫朱雀', desc: '朱雀轸宿，主车骑风歌' },
]

export default function XingxiuPage() {
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

      <SubPageSection title="二十八宿详解">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {CONSTELLATIONS.map((star, index) => (
            <motion.div
              key={star.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <h3 style={{ color: '#b89438', marginBottom: '0.5rem' }}>
                {star.name}
              </h3>
              <p style={{
                color: 'rgba(154, 123, 41, 0.6)',
                fontSize: '0.85rem',
                marginBottom: '0.5rem',
              }}>
                {star.palace}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}>
                {star.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="四象分野">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {[
            { name: '东宫青龙', color: '#22c55e', stars: '角亢氐房心尾箕', desc: '东方七宿，主春生之气' },
            { name: '北宫玄武', color: '#3b82f6', stars: '斗牛女虚危室壁', desc: '北方七宿，主冬藏之气' },
            { name: '西宫白虎', color: '#f59e0b', stars: '奎娄胃昴毕觜参', desc: '西方七宿，主秋收之气' },
            { name: '南宫朱雀', color: '#ef4444', stars: '井鬼柳星张翼轸', desc: '南方七宿，主夏长之气' },
          ].map((palace, index) => (
            <motion.div
              key={palace.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: palace.color, marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                {palace.name}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.8)',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                fontFamily: 'serif',
                letterSpacing: '0.1em',
              }}>
                {palace.stars}
              </p>
              <p style={{ color: 'rgba(180, 180, 190, 0.7)', fontSize: '0.85rem' }}>
                {palace.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
