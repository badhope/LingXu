/**
 * 灵墟 - 天时模块 - 占卜页面
 */

'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

export default function ZhanbuPage() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<{ gua: string; meaning: string; desc: string } | null>(null)
  const [coins, setCoins] = useState<number[]>([])
  
  const guaResults = [
    { gua: '乾', meaning: '元亨利贞 - 大吉之象，诸事顺遂。刚健进取，自强不息。', desc: '此卦为纯阳之卦，代表天，象征着刚健不息的精神。运势极强，适合大胆行动。' },
    { gua: '坤', meaning: '元亨利牝马之贞 - 吉。顺应大地之德，厚德载物。', desc: '此卦为纯阴之卦，代表地，象征着柔顺包容的精神。适合稳扎稳打。' },
    { gua: '屯', meaning: '元亨利贞，勿用有攸往 - 中吉。万事开头难，慎始则吉。', desc: '此卦代表事物的初生阶段，虽然困难重重，但前景光明。' },
    { gua: '蒙', meaning: '亨。匪我求童蒙，童蒙求我 - 吉。启蒙教化，循序渐进。', desc: '此卦代表蒙昧无知，需要学习与教导。适合接受指导。' },
    { gua: '需', meaning: '有孚，光亨，贞吉 - 中吉。等待时机，耐心守候。', desc: '此卦代表需要等待，不可轻举妄动。时机成熟自会有所收获。' },
    { gua: '讼', meaning: '有孚，窒惕，中吉终凶 - 凶。争讼止息，以和为贵。', desc: '此卦代表争讼纠纷，宜和解不宜诉讼。' },
  ]

  const throwCoins = () => {
    if (!question) {
      alert('请先输入您的问题')
      return
    }
    const results = Array.from({ length: 3 }, () => Math.floor(Math.random() * 2))
    setCoins(results)
    
    const yaoValue = results.reduce((acc, r, i) => acc + r * Math.pow(2, i), 0)
    const gua = guaResults[yaoValue % guaResults.length]
    setResult(gua)
  }

  return (
    <Layout title="占卜">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🎴</div>
          <h1 className={styles.title}>占卜大厅</h1>
          <p className={styles.subtitle}>心诚则灵，占卜问事</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>铜钱占卜</h2>
          <div className={styles.toolBox}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>心中默念您的问题</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="例如：我明天面试能否成功？"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            
            <button className={styles.button} onClick={throwCoins}>
              掷三枚铜钱
            </button>

            {coins.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <div style={{ marginBottom: '1rem', color: '#888' }}>铜钱结果</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  {coins.map((c, i) => (
                    <div key={i} style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: c === 1 ? '#c9a227' : '#1a1a2e',
                      border: '2px solid #c9a227',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      color: c === 1 ? '#0a0a0f' : '#c9a227'
                    }}>
                      {c === 1 ? '阳' : '阴'}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className={styles.resultBox}>
                <h3 className={styles.resultTitle}>所得卦象</h3>
                <div className={styles.resultContent}>{result.gua}卦</div>
                <p className={styles.resultDesc} style={{ marginTop: '1rem', fontSize: '1rem' }}>{result.meaning}</p>
                <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '1rem', lineHeight: 1.8 }}>{result.desc}</p>
              </div>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>占卜须知</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>占卜前的准备</h4>
            <ul style={{ color: '#888', lineHeight: 2, paddingLeft: '1.5rem', margin: 0 }}>
              <li>找一个安静的环境，净手静心</li>
              <li>心中默念想要询问的问题</li>
              <li>问题要具体明确，避免模糊笼统</li>
              <li>保持虔诚的心态，不可戏卜</li>
            </ul>
          </div>
          <div className={styles.infoBox} style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>占卜的局限性</h4>
            <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
              占卜是一种参考，而非定数。命运掌握在自己手中，
              好的运势需要把握，坏的运势可以化解。
              切记不可过于依赖占卜结果而忽视自身努力。
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>六十四卦简介</h2>
          <div className={styles.cardGrid}>
            {guaResults.map((g, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.starName}>{g.gua}卦</span>
                </div>
                <p className={styles.cardDesc} style={{ marginTop: '0.5rem' }}>{g.meaning.split(' - ')[0]}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
