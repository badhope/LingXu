'use client'

import { motion } from 'framer-motion'
import SubPageTemplate, { SubPageSection, InfoCard } from '@/components/layout/SubPageTemplate'

const GEOGRAPHY = [
  { name: '五岳', icon: '🏔️', desc: '东岳泰山，西岳华山，南岳衡山，北岳恒山，中岳嵩山，镇国之地脉' },
  { name: '四渎', icon: '🌊', desc: '长江、黄河、淮河、济水，四水入海，为天下四大渎，水龙之经络' },
  { name: '九州', icon: '🗺️', desc: '冀、兖、青、徐、扬、荆、豫、梁、雍，禹贡九州，华夏之版图' },
  { name: '三大干龙', icon: '🐉', desc: '北龙阴山，中龙秦岭，南龙南岭，三龙自昆仑分脉，尽结于东海' },
  { name: '四大佛教名山', icon: '🙏', desc: '五台文殊，普陀观音，峨眉普贤，九华地藏，菩萨道场灵气所钟' },
  { name: '道教洞天', icon: '☯️', desc: '十大洞天，三十六小洞天，七十二福地，仙人栖息修真之所' },
]

export default function DiliPage() {
  return (
    <SubPageTemplate
      title="天下地理"
      subtitle="五岳四渎 · 九州分野 · 山川形胜 · 气运所钟"
      icon="🌏"
      colorRgb="16, 185, 129"
    >
      <SubPageSection title="地理形胜">
        <InfoCard>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8, marginBottom: '1rem' }}>
            天有五星，地有五岳。天有七政，地有七表。天气下降，地气上腾。天地交泰，化生万物。
            一方水土养一方人，山川形胜不同，人物气质各异。
          </p>
          <p style={{ color: 'rgba(180, 180, 190, 0.75)', lineHeight: 1.8 }}>
            山管人丁水管财。仁者乐山，智者乐水。西北山高，多勇武之士；东南水盛，出文章之才。
            中原土厚，帝王之所兴；巴蜀险峻，豪杰之所起。
          </p>
        </InfoCard>
      </SubPageSection>

      <SubPageSection title="神州形胜">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {GEOGRAPHY.map((geo, index) => (
            <motion.div
              key={geo.name}
              className="xian-submodule-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {geo.icon}
              </div>
              <h3 style={{ color: '#b89438', marginBottom: '0.75rem' }}>
                {geo.name}
              </h3>
              <p style={{
                color: 'rgba(180, 180, 190, 0.7)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}>
                {geo.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>

      <SubPageSection title="八方风气">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '1rem',
        }}>
          {[
            { title: '东方', people: '青秀', desc: '木气盛，人多聪明仁厚，文章尔雅，衣冠文物之所出' },
            { title: '南方', people: '明达', desc: '火气盛，人多热情奔放，辞令巧妙，商贾技巧之所兴' },
            { title: '西方', people: '勇毅', desc: '金气盛，人多刚毅果决，气力过人，将帅武功之所立' },
            { title: '北方', people: '沉厚', desc: '水气盛，人多深沉有谋，纯厚质朴，帝王基业之所起' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="xian-submodule-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ color: '#b89438', textAlign: 'center', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{
                color: 'rgba(154, 123, 41, 0.6)',
                fontSize: '0.85rem',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}>
                人性{item.people}
              </p>
              <p style={{
                color: 'rgba(180, 180, 190, 0.75)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SubPageSection>
    </SubPageTemplate>
  )
}
