/**
 * 灵墟 - 玄学模块 - 易经页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function YijingPage() {
  const [selectedGua, setSelectedGua] = useState<number | null>(null)
  
  const hexagrams = [
    { num: 1, name: '乾', meaning: '元亨利贞', desc: '纯阳至刚，象征天，代表创造力和领导力。运势极强，万事亨通。' },
    { num: 2, name: '坤', meaning: '元亨利牝马之贞', desc: '纯阴至柔，象征地，代表包容和顺从。宜稳守待机。' },
    { num: 3, name: '屯', meaning: '元亨利贞，勿用有攸往', desc: '事物初创，艰难困顿。但前途光明，需要耐心等待。' },
    { num: 4, name: '蒙', meaning: '亨，匪我求童蒙，童蒙求我', desc: '蒙昧无知，需要教导。学习使人进步。' },
    { num: 5, name: '需', meaning: '有孚，光亨，贞吉', desc: '需要等待，不可冒进。耐心等待会有收获。' },
    { num: 6, name: '讼', meaning: '有孚，窒惕，中吉终凶', desc: '争讼纠纷，宜和解。以和为贵，避免诉讼。' },
    { num: 7, name: '师', meaning: '贞，丈人吉，无咎', desc: '统兵作战，需有德高望重者带领。' },
    { num: 8, name: '比', meaning: '吉，原筮，元永贞', desc: '亲比辅助，团结一致。选对盟友很重要。' },
  ]

  const selected = selectedGua !== null ? hexagrams[selectedGua] : null

  return (
    <Layout title="易经">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>☰</div>
          <h1 className={styles.title}>易经六十四卦</h1>
          <p className={styles.subtitle}>变易之道，万物之源</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六十四卦图</h2>
          <p className={styles.sectionDesc}>
            点击卦象查看详细解读。易经是中华文化的源头，蕴含着深邃的哲学思想。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem', marginTop: '1.5rem' }}>
            {hexagrams.map((gua, i) => (
              <div 
                key={gua.num} 
                onClick={() => setSelectedGua(i)}
                className={styles.card}
                style={{ 
                  cursor: 'pointer',
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  borderColor: selectedGua === i ? '#c9a227' : 'rgba(201, 162, 39, 0.15)',
                  background: selectedGua === i ? 'rgba(201, 162, 39, 0.1)' : 'rgba(26, 26, 46, 0.5)'
                }}
              >
                <div style={{ fontSize: '1.5rem', color: '#c9a227', marginBottom: '0.25rem' }}>{gua.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>{gua.num}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem', marginTop: '0.25rem' }}>
            {Array.from({ length: 56 }, (_, i) => (
              <div 
                key={i + 8} 
                onClick={() => setSelectedGua(i + 8)}
                className={styles.card}
                style={{ 
                  cursor: 'pointer',
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  color: '#888'
                }}
              >
                <div style={{ fontSize: '1.25rem', color: '#c9a227' }}>☷</div>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>{i + 9}</div>
              </div>
            ))}
          </div>
        </section>

        {selected && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{selected.name}卦 详解</h2>
            <div className={styles.toolBox}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '4rem', color: '#c9a227', marginBottom: '1rem' }}>{selected.name}</div>
                <div style={{ fontSize: '1.25rem', color: '#e8d48b' }}>第{selected.num}卦</div>
              </div>
              <div className={styles.resultBox}>
                <h3 className={styles.resultTitle}>卦辞</h3>
                <div className={styles.resultContent}>{selected.meaning}</div>
              </div>
              <div className={styles.infoBox} style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>卦象解读</h4>
                <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>{selected.desc}</p>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八卦基础</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {[
              { symbol: '☰', name: '乾', element: '天', meaning: '刚健' },
              { symbol: '☱', name: '兑', element: '泽', meaning: '喜悦' },
              { symbol: '☲', name: '离', element: '火', meaning: '光明' },
              { symbol: '☳', name: '震', element: '雷', meaning: '震动' },
              { symbol: '☴', name: '巽', element: '风', meaning: '入' },
              { symbol: '☵', name: '坎', element: '水', meaning: '险陷' },
              { symbol: '☶', name: '艮', element: '山', meaning: '静止' },
              { symbol: '☷', name: '坤', element: '地', meaning: '柔顺' },
            ].map((bagua) => (
              <div key={bagua.name} className={styles.card} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', color: '#c9a227', marginBottom: '0.5rem' }}>{bagua.symbol}</div>
                <div style={{ color: '#e8d48b', fontWeight: 500 }}>{bagua.name}</div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>{bagua.element} · {bagua.meaning}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
