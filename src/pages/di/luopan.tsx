/**
 * 灵墟 - 地理模块 - 罗盘页面（增强版）
 * 交互式风水罗盘 + 二十四山 + 八方吉凶
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import Layout from '@/components/layout/Layout'
import styles from './SubPage.module.scss'

// 二十四山
const ERSHISI_SHAN = [
  '壬', '子', '癸', '丑', '艮', '寅', '甲', '卯', '乙', '辰', '巽', '巳',
  '丙', '午', '丁', '未', '坤', '申', '庚', '酉', '辛', '戌', '乾', '亥'
]

// 八方属性
const BAFANG: Record<string, { name: string; element: string; color: string; desc: string }> = {
  '北': { name: '坎', element: '水', color: '#1E90FF', desc: '事业、智慧、中男' },
  '东北': { name: '艮', element: '土', color: '#DAA520', desc: '财富、少男、文昌' },
  '东': { name: '震', element: '木', color: '#228B22', desc: '健康、长男、贵人' },
  '东南': { name: '巽', element: '木', color: '#32CD32', desc: '财运、长女、文昌' },
  '南': { name: '离', element: '火', color: '#FF4500', desc: '名声、中女、桃花' },
  '西南': { name: '坤', element: '土', color: '#DAA520', desc: '婚姻、母亲、人缘' },
  '西': { name: '兑', element: '金', color: '#C0C0C0', desc: '子孙、少女、桃花' },
  '西北': { name: '乾', element: '金', color: '#C0C0C0', desc: '贵人、父亲、权力' }
}

// 八卦符号
const BAGUA_SYMBOLS: Record<string, string> = {
  '坎': '☵', '艮': '☶', '震': '☳', '巽': '☴',
  '离': '☲', '坤': '☷', '兑': '☱', '乾': '☰'
}

// 八卦顺序
const BAGUA_ORDER = ['坎', '艮', '震', '巽', '离', '坤', '兑', '乾']

export default function LuopanPage() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)
  const [currentDirection, setCurrentDirection] = useState('北')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // 绘制罗盘
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const size = 320
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = size + 'px'
    canvas.style.height = size + 'px'
    ctx.scale(dpr, dpr)
    
    const cx = size / 2
    const cy = size / 2
    
    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-cx, -cy)
    
    // 外圈
    ctx.beginPath()
    ctx.arc(cx, cy, 155, 0, Math.PI * 2)
    ctx.fillStyle = '#1a1a2e'
    ctx.fill()
    ctx.strokeStyle = '#c9a227'
    ctx.lineWidth = 3
    ctx.stroke()
    
    // 二十四山圈
    ctx.beginPath()
    ctx.arc(cx, cy, 130, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(201, 162, 39, 0.5)'
    ctx.lineWidth = 1
    ctx.stroke()
    
    // 绘制二十四山
    ctx.font = '12px serif'
    ctx.fillStyle = '#e8d48b'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    ERSHISI_SHAN.forEach((shan, i) => {
      const angle = ((i * 15 - 90) * Math.PI) / 180
      const x = cx + Math.cos(angle) * 142
      const y = cy + Math.sin(angle) * 142
      ctx.fillText(shan, x, y)
      
      // 刻度线
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * 130, cy + Math.sin(angle) * 130)
      ctx.lineTo(cx + Math.cos(angle) * 155, cy + Math.sin(angle) * 155)
      ctx.strokeStyle = i % 2 === 0 ? '#c9a227' : 'rgba(201, 162, 39, 0.5)'
      ctx.lineWidth = i % 2 === 0 ? 2 : 1
      ctx.stroke()
    })
    
    // 八卦圈
    ctx.beginPath()
    ctx.arc(cx, cy, 100, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(201, 162, 39, 0.3)'
    ctx.lineWidth = 1
    ctx.stroke()
    
    // 绘制八卦
    BAGUA_ORDER.forEach((gua, i) => {
      const angle = ((i * 45 - 90) * Math.PI) / 180
      const x = cx + Math.cos(angle) * 115
      const y = cy + Math.sin(angle) * 115
      
      ctx.font = '20px serif'
      ctx.fillStyle = '#c9a227'
      ctx.fillText(BAGUA_SYMBOLS[gua], x, y)
      
      ctx.font = '10px serif'
      ctx.fillStyle = '#888'
      ctx.fillText(gua, x, y + 16)
    })
    
    // 内圈 - 太极
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60)
    gradient.addColorStop(0, 'rgba(201, 162, 39, 0.3)')
    gradient.addColorStop(1, 'rgba(26, 26, 46, 0.8)')
    
    ctx.beginPath()
    ctx.arc(cx, cy, 60, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.strokeStyle = '#c9a227'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // 太极图
    ctx.beginPath()
    ctx.arc(cx, cy, 45, -Math.PI / 2, Math.PI / 2)
    ctx.fillStyle = 'rgba(232, 212, 139, 0.9)'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(cx, cy - 22.5, 22.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(26, 26, 46, 0.9)'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(cx, cy + 22.5, 22.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(232, 212, 139, 0.9)'
    ctx.fill()
    
    // 鱼眼
    ctx.beginPath()
    ctx.arc(cx, cy - 22.5, 7, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(232, 212, 139, 0.9)'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(cx, cy + 22.5, 7, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(26, 26, 46, 0.9)'
    ctx.fill()
    
    ctx.restore()
    
    // 固定的指南针指针
    ctx.beginPath()
    ctx.moveTo(cx, cy - 170)
    ctx.lineTo(cx - 8, cy - 185)
    ctx.lineTo(cx, cy - 175)
    ctx.lineTo(cx + 8, cy - 185)
    ctx.closePath()
    ctx.fillStyle = '#c9a227'
    ctx.fill()
    
    ctx.font = 'bold 12px sans-serif'
    ctx.fillStyle = '#c9a227'
    ctx.textAlign = 'center'
    ctx.fillText('北', cx, cy - 192)
    
  }, [rotation])
  
  // 更新当前方位
  useEffect(() => {
    const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
    const index = Math.round(((-rotation % 360 + 360) % 360) / 45) % 8
    setCurrentDirection(directions[index])
  }, [rotation])
  
  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    setStartAngle(angle - rotation)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    setRotation(angle - startAngle)
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  // 触摸支持
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY } as React.MouseEvent)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as React.MouseEvent)
  }
  
  const currentInfo = BAFANG[currentDirection]
  
  return (
    <Layout title="罗盘">
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>🧭</div>
          <h1 className={styles.title}>风水罗盘</h1>
          <p className={styles.subtitle}>定方位，知吉凶</p>
        </header>

        {/* 罗盘 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>交互式罗盘</h2>
          <div className={styles.toolBox} style={{ textAlign: 'center' }}>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>拖动罗盘旋转，查看不同方位的属性</p>
            
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <canvas 
                ref={canvasRef}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              />
            </div>
            
            {/* 当前方位信息 */}
            <div className={styles.resultBox} style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{BAGUA_SYMBOLS[currentInfo.name]}</span>
                <div>
                  <div style={{ color: '#c9a227', fontSize: '1.25rem' }}>{currentDirection}方 · {currentInfo.name}卦</div>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>五行：{currentInfo.element}</div>
                </div>
              </div>
              <p style={{ color: '#e8d48b', marginTop: '1rem', marginBottom: 0 }}>{currentInfo.desc}</p>
            </div>
          </div>
        </section>

        {/* 二十四山 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>二十四山</h2>
          <div className={styles.infoBox}>
            <p style={{ color: '#888', lineHeight: 1.8 }}>
              二十四山是风水学中的基本方位系统，将圆周分为二十四个等份，每份15度。
              由八天干、十二地支和四维卦（乾、坤、艮、巽）组成。
            </p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(8, 1fr)', 
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            {ERSHISI_SHAN.map((shan, i) => (
              <div 
                key={i}
                style={{
                  padding: '0.5rem',
                  background: 'rgba(26, 26, 46, 0.5)',
                  border: '1px solid rgba(201, 162, 39, 0.2)',
                  borderRadius: '4px',
                  textAlign: 'center',
                  color: '#e8d48b',
                  fontSize: '0.9rem'
                }}
              >
                {shan}
              </div>
            ))}
          </div>
        </section>

        {/* 八方吉凶 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>八方属性</h2>
          <div className={styles.cardGrid}>
            {Object.entries(BAFANG).map(([dir, info]) => (
              <div key={dir} className={styles.card} style={{ padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: info.color }}>{BAGUA_SYMBOLS[info.name]}</div>
                <h3 style={{ color: '#c9a227', margin: '0.5rem 0 0.25rem' }}>{dir} · {info.name}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{info.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 使用说明 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>使用说明</h2>
          <div className={styles.infoBox}>
            <ul style={{ color: '#888', lineHeight: 2, paddingLeft: '1.5rem', margin: 0 }}>
              <li>拖动罗盘可旋转查看不同方位</li>
              <li>红色指针始终指向北方</li>
              <li>外圈为二十四山方位</li>
              <li>内圈为八卦方位</li>
              <li>罗盘中心为太极图，象征阴阳平衡</li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}
