/**
 * 灵墟 - 玄学模块 - 符箓生成器
 * 多种符箓模板 + SVG动态生成 + 下载功能
 */

'use client'

import { useState, useRef } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

const FU_TEMPLATES = [
  { id: 'pingan', name: '平安符', icon: '🛡️', desc: '保佑平安，驱邪避煞', color: '#4ade80' },
  { id: 'zhaocai', name: '招财符', icon: '💰', desc: '招揽财气，增加财运', color: '#fbbf24' },
  { id: 'quxie', name: '驱邪符', icon: '⚔️', desc: '驱除邪祟，护佑安康', color: '#f87171' },
  { id: 'wenchang', name: '文昌符', icon: '📚', desc: '增慧开智，学业进步', color: '#60a5fa' },
  { id: 'yinyuan', name: '姻缘符', icon: '💕', desc: '姻缘和合，感情顺利', color: '#f472b6' },
  { id: 'jiankang', name: '健康符', icon: '🏥', desc: '祛病延年，身体健康', color: '#34d399' }
]

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export default function FuluPage() {
  const [selectedFu, setSelectedFu] = useState(FU_TEMPLATES[0])
  const [name, setName] = useState('')
  const [bazi, setBazi] = useState('')
  const [generated, setGenerated] = useState(false)
  const [showRitual, setShowRitual] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // 生成随机符文
  const generateFuwen = () => {
    const lines: string[] = []
    // 符头
    lines.push(`☰ ${selectedFu.name.replace('符', '')} ☷`)
    // 主体符文
    const chars = selectedFu.id.split('')
    const fuwen = chars.map(c => c.charCodeAt(0).toString(16)).join('')
    lines.push(fuwen.toUpperCase())
    // 随机符文
    for (let i = 0; i < 3; i++) {
      const randomFu = Math.random().toString(36).substring(2, 8).toUpperCase()
      lines.push(randomFu)
    }
    return lines
  }

  // 生成符箓
  const handleGenerate = () => {
    setGenerated(true)
    setShowRitual(true)
    setTimeout(() => setShowRitual(false), 3000)
  }

  // 下载符箓
  const handleDownload = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    canvas.width = 400
    canvas.height = 600
    
    img.onload = () => {
      ctx?.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.download = `${selectedFu.name}_${name || '无名'}.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  const fuwen = generated ? generateFuwen() : []
  const currentDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Layout title="符箓">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>📜</div>
          <h1 className={styles.title}>道家符箓</h1>
          <p className={styles.subtitle}>驱邪护身，趋吉避凶</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>选择符箓</h2>
          <div className={styles.cardGrid}>
            {FU_TEMPLATES.map(fu => (
              <div
                key={fu.id}
                className={styles.card}
                onClick={() => { setSelectedFu(fu); setGenerated(false) }}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  border: selectedFu.id === fu.id ? `2px solid ${fu.color}` : undefined,
                  boxShadow: selectedFu.id === fu.id ? `0 0 20px ${fu.color}40` : undefined
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{fu.icon}</div>
                <h3 style={{ color: fu.color, margin: '0 0 0.25rem' }}>{fu.name}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>{fu.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>个人信息（可选）</h2>
          <div className={styles.toolBox}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>姓名</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="请输入姓名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>生辰八字</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="如：甲子年乙丑月丙寅日丁卯时"
                  value={bazi}
                  onChange={(e) => setBazi(e.target.value)}
                />
              </div>
            </div>
            <button
              className={styles.button}
              onClick={handleGenerate}
              style={{ marginTop: '1.5rem' }}
            >
              {generated ? '重新生成' : '开光请符'}
            </button>
          </div>
        </section>

        {generated && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>您的{selectedFu.name}</h2>
            <div className={styles.resultBox} style={{ textAlign: 'center' }}>
              {showRitual ? (
                <div style={{ padding: '4rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1s infinite' }}>🙏</div>
                  <p style={{ color: selectedFu.color, fontSize: '1.25rem' }}>开光仪式进行中...</p>
                  <p style={{ color: '#888', marginTop: '0.5rem' }}>请保持虔诚之心</p>
                </div>
              ) : (
                <>
                  <svg
                    ref={svgRef}
                    viewBox="0 0 400 600"
                    style={{ maxWidth: '100%', height: 'auto', background: '#f5f0e6', borderRadius: '8px' }}
                  >
                    {/* 背景 */}
                    <rect x="20" y="20" width="360" height="560" fill="#f5f0e6" stroke="#8b7355" strokeWidth="2" rx="8" />
                    
                    {/* 边框装饰 */}
                    <rect x="30" y="30" width="340" height="540" fill="none" stroke={selectedFu.color} strokeWidth="1" rx="4" />
                    <rect x="35" y="35" width="330" height="530" fill="none" stroke={selectedFu.color} strokeWidth="1" strokeDasharray="4 2" rx="4" />
                    
                    {/* 符头 */}
                    <text x="200" y="80" textAnchor="middle" fill={selectedFu.color} fontSize="24" fontWeight="bold">
                      {selectedFu.icon} {selectedFu.name} {selectedFu.icon}
                    </text>
                    <line x1="80" y1="100" x2="320" y2="100" stroke={selectedFu.color} strokeWidth="1" />
                    
                    {/* 符文主体 */}
                    <text x="200" y="160" textAnchor="middle" fill="#8b4513" fontSize="20" fontFamily="serif">
                      敕令
                    </text>
                    
                    {/* 主要符文 */}
                    {fuwen.map((line, i) => (
                      <text key={i} x="200" y={220 + i * 50} textAnchor="middle" fill="#8b4513" fontSize="28" fontFamily="serif" fontWeight="bold">
                        {line}
                      </text>
                    ))}
                    
                    {/* 姓名和八字 */}
                    {name && (
                      <text x="200" y="420" textAnchor="middle" fill="#8b4513" fontSize="16">
                        信士：{name}
                      </text>
                    )}
                    {bazi && (
                      <text x="200" y="445" textAnchor="middle" fill="#8b4513" fontSize="14">
                        生辰：{bazi}
                      </text>
                    )}
                    
                    {/* 日期 */}
                    <text x="200" y="490" textAnchor="middle" fill="#666" fontSize="12">
                      {currentDate}
                    </text>
                    
                    {/* 符脚 */}
                    <text x="200" y="530" textAnchor="middle" fill={selectedFu.color} fontSize="16">
                      灵墟档案馆 敕
                    </text>
                    
                    {/* 印章 */}
                    <rect x="160" y="540" width="80" height="30" fill="none" stroke="#c41e3a" strokeWidth="2" rx="4" />
                    <text x="200" y="560" textAnchor="middle" fill="#c41e3a" fontSize="14" fontWeight="bold">
                      灵墟
                    </text>
                  </svg>

                  <p style={{ color: selectedFu.color, marginTop: '1.5rem', fontSize: '1.1rem' }}>
                    ✨ 符箓已开光完成 ✨
                  </p>
                  <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    {selectedFu.desc}
                  </p>

                  <button
                    className={styles.button}
                    onClick={handleDownload}
                    style={{ marginTop: '1.5rem', background: selectedFu.color }}
                  >
                    📥 下载符箓
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>符箓使用说明</h2>
          <div className={styles.infoBox}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>使用方法</h4>
            <ul style={{ color: '#888', lineHeight: 2, paddingLeft: '1.5rem', margin: 0 }}>
              <li>将符箓打印或保存在手机中随身携带</li>
              <li>放置于床头、办公桌或钱包内</li>
              <li>每日清晨默念符箓功效，心诚则灵</li>
              <li>符箓有效期为一年，期满后焚化谢符</li>
            </ul>
          </div>
          <div className={styles.infoBox} style={{ marginTop: '1rem' }}>
            <h4 style={{ color: '#c9a227', marginBottom: '1rem' }}>注意事项</h4>
            <ul style={{ color: '#888', lineHeight: 2, paddingLeft: '1.5rem', margin: 0 }}>
              <li>符箓仅供娱乐和心理暗示，无实际法力</li>
              <li>不可用于违法犯罪或伤害他人</li>
              <li>心存善念，方得神明护佑</li>
              <li>理性对待，不可过度迷信</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}
