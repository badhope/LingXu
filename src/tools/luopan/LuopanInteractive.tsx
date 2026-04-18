'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TWENTY_FOUR_MOUNTAINS, LUOPAN_LAYERS_CONFIG } from './luopan-constants'
import styles from './Luopan.module.scss'

export default function LuopanInteractive() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const [selectedMountain, setSelectedMountain] = useState<number | null>(null)
  const [showLayerPanel, setShowLayerPanel] = useState(false)
  const [showHelpPanel, setShowHelpPanel] = useState(false)
  const [visibleLayers, setVisibleLayers] = useState<string[]>(LUOPAN_LAYERS_CONFIG.map(l => l.id))
  
  const dragState = useRef({
    isDragging: false,
    startAngle: 0,
    startRotation: 0,
    velocity: 0,
    lastAngle: 0,
    lastTime: 0,
  })
  const rafRef = useRef<number | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  const centerX = 220
  const centerY = 220
  const maxRadius = 200

  const getAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left - centerX
    const y = clientY - rect.top - centerY
    const distance = Math.sqrt(x * x + y * y)
    if (distance < 10) return dragState.current.lastAngle
    return Math.atan2(y, x) * (180 / Math.PI)
  }, [])

  const getAngleTouch = useCallback((touch: React.Touch | Touch) => {
    if (!containerRef.current) return 0
    const rect = containerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left - centerX
    const y = touch.clientY - rect.top - centerY
    const distance = Math.sqrt(x * x + y * y)
    if (distance < 10) return dragState.current.lastAngle
    return Math.atan2(y, x) * (180 / Math.PI)
  }, [])

  const handleDragStart = useCallback((angle: number) => {
    dragState.current = {
      isDragging: true,
      startAngle: angle,
      startRotation: rotation,
      velocity: 0,
      lastAngle: angle,
      lastTime: Date.now(),
    }
  }, [rotation])

  const handleDragMove = useCallback((angle: number) => {
    if (!dragState.current.isDragging) return
    
    const now = Date.now()
    const dt = now - dragState.current.lastTime
    
    let rawDelta = angle - dragState.current.lastAngle
    if (rawDelta > 180) rawDelta -= 360
    if (rawDelta < -180) rawDelta += 360
    
    if (dt > 0) {
      dragState.current.velocity = rawDelta / dt * 16
    }
    
    let startDelta = angle - dragState.current.startAngle
    if (startDelta > 180) startDelta -= 360
    if (startDelta < -180) startDelta += 360
    
    setRotation(dragState.current.startRotation + startDelta)
    dragState.current.lastAngle = angle
    dragState.current.lastTime = now
  }, [])

  const handleDragEnd = useCallback(() => {
    dragState.current.isDragging = false

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    const decelerate = () => {
      if (!mountedRef.current) return
      if (Math.abs(dragState.current.velocity) < 0.05) {
        rafRef.current = null
        return
      }
      
      dragState.current.velocity *= 0.95
      setRotation(r => r + dragState.current.velocity)
      rafRef.current = requestAnimationFrame(decelerate)
    }
    
    decelerate()
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(getAngle(e.clientX, e.clientY))
  }, [handleDragStart, getAngle])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleDragMove(getAngle(e.clientX, e.clientY))
  }, [handleDragMove, getAngle])

  const handleMouseUp = useCallback(() => {
    handleDragEnd()
  }, [handleDragEnd])

  const handleElementTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches[0]) {
      handleDragStart(getAngleTouch(e.touches[0]))
    }
  }, [handleDragStart, getAngleTouch])

  const handleWindowTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()
    if (e.touches[0]) {
      handleDragMove(getAngleTouch(e.touches[0]))
    }
  }, [handleDragMove, getAngleTouch])

  const handleTouchEnd = useCallback(() => {
    handleDragEnd()
  }, [handleDragEnd])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleWindowTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleMouseMove, handleMouseUp, handleWindowTouchMove, handleTouchEnd])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, 440, 440)
    
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate((rotation * Math.PI) / 180)

    LUOPAN_LAYERS_CONFIG.forEach((layer, layerIndex) => {
      if (!visibleLayers.includes(layer.id)) return
      
      const inner = layer.innerRadius
      const outer = layer.outerRadius

      ctx.beginPath()
      ctx.arc(0, 0, outer, 0, Math.PI * 2)
      ctx.strokeStyle = layerIndex % 2 === 0 ? '#5c4a2d' : '#8b7355'
      ctx.lineWidth = 1
      ctx.stroke()

      if (layer.id === 'center') {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outer)
        gradient.addColorStop(0, '#1a1510')
        gradient.addColorStop(0.7, '#2d2518')
        gradient.addColorStop(1, '#1a1510')
        ctx.beginPath()
        ctx.arc(0, 0, outer, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(0, 0, outer - 5, 0, Math.PI * 2)
        ctx.strokeStyle = '#d4af37'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, -outer + 10)
        ctx.lineTo(0, outer - 10)
        ctx.moveTo(-outer + 10, 0)
        ctx.lineTo(outer - 10, 0)
        ctx.strokeStyle = '#ef4444'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.save()
        ctx.rotate((-rotation * Math.PI) / 180)
        ctx.beginPath()
        ctx.moveTo(0, -outer + 15)
        ctx.lineTo(-6, -outer + 25)
        ctx.lineTo(6, -outer + 25)
        ctx.closePath()
        ctx.fillStyle = '#ef4444'
        ctx.fill()
        ctx.restore()

        ctx.fillStyle = '#d4af37'
        ctx.font = 'bold 11px serif'
        ctx.textAlign = 'center'
        ctx.fillText('天池', 0, 5)
      }

      if (layer.id === 'eight-trigrams') {
        const trigrams = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']
        const names = ['乾', '兌', '離', '震', '巽', '坎', '艮', '坤']
        const angles = [-135, -90, -45, 0, 45, 90, 135, 180]
        
        trigrams.forEach((tg, i) => {
          const ang = (angles[i] * Math.PI) / 180
          const r = (inner + outer) / 2
          const x = Math.cos(ang) * r
          const y = Math.sin(ang) * r
          
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(ang + Math.PI / 2)
          ctx.fillStyle = '#d4af37'
          ctx.font = 'bold 18px serif'
          ctx.textAlign = 'center'
          ctx.fillText(tg, 0, 5)
          ctx.font = '10px serif'
          ctx.fillStyle = '#c9a96a'
          ctx.fillText(names[i], 0, 18)
          ctx.restore()
        })
      }

      if (layer.id === 'earthly-branches') {
        const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
        
        branches.forEach((br, i) => {
          const ang = (i * 30 - 90) * Math.PI / 180
          const r = (inner + outer) / 2
          const x = Math.cos(ang) * r
          const y = Math.sin(ang) * r
          
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(ang + Math.PI / 2)
          ctx.fillStyle = i % 2 === 0 ? '#d4af37' : '#c9a96a'
          ctx.font = 'bold 12px serif'
          ctx.textAlign = 'center'
          ctx.fillText(br, 0, 4)
          ctx.restore()
        })
      }

      if (layer.id === '24-mountains') {
        TWENTY_FOUR_MOUNTAINS.forEach((m, i) => {
          const ang = (i * 15 - 90) * Math.PI / 180
          const r = (inner + outer) / 2
          const x = Math.cos(ang) * r
          const y = Math.sin(ang) * r
          
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(ang + Math.PI / 2)
          
          const isEven = i % 2 === 0
          ctx.fillStyle = selectedMountain === i ? '#fbbf24' : m.color || '#d4af37'
          ctx.font = 'bold 11px serif'
          ctx.textAlign = 'center'
          ctx.fillText(m.name, 0, 4)
          ctx.restore()

          ctx.beginPath()
          ctx.moveTo(Math.cos(ang) * inner, Math.sin(ang) * inner)
          ctx.lineTo(Math.cos(ang) * outer, Math.sin(ang) * outer)
          ctx.strokeStyle = 'rgba(139, 115, 85, 0.5)'
          ctx.lineWidth = 0.5
          ctx.stroke()
        })
      }

      if (layer.id === '120-fenjin') {
        for (let i = 0; i < 120; i++) {
          const ang = (i * 3 - 90) * Math.PI / 180
          const isWang = i % 5 === 2 || i % 5 === 3
          
          ctx.beginPath()
          ctx.moveTo(Math.cos(ang) * inner, Math.sin(ang) * inner)
          ctx.lineTo(Math.cos(ang) * outer, Math.sin(ang) * outer)
          ctx.strokeStyle = isWang ? '#d4af37' : 'rgba(139, 115, 85, 0.3)'
          ctx.lineWidth = isWang ? 1 : 0.5
          ctx.stroke()
        }
      }

      if (layer.id === 'degrees') {
        for (let i = 0; i < 360; i++) {
          const ang = (i - 90) * Math.PI / 180
          const isMajor = i % 10 === 0
          const isMedium = i % 5 === 0
          
          const markLength = isMajor ? 15 : isMedium ? 10 : 5
          ctx.beginPath()
          ctx.moveTo(Math.cos(ang) * (outer - markLength), Math.sin(ang) * (outer - markLength))
          ctx.lineTo(Math.cos(ang) * outer, Math.sin(ang) * outer)
          ctx.strokeStyle = isMajor ? '#d4af37' : '#8b7355'
          ctx.lineWidth = isMajor ? 1.5 : isMedium ? 1 : 0.5
          ctx.stroke()

          if (isMajor) {
            const r = outer - 22
            const x = Math.cos(ang) * r
            const y = Math.sin(ang) * r
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(ang + Math.PI / 2)
            ctx.fillStyle = '#c9a96a'
            ctx.font = '8px serif'
            ctx.textAlign = 'center'
            ctx.fillText(i.toString(), 0, 3)
            ctx.restore()
          }
        }
      }
    })

    ctx.restore()

    ctx.save()
    ctx.translate(centerX, centerY)
    ;[0, 90, 180, 270].forEach((deg) => {
      const ang = (deg - 90) * Math.PI / 180
      ctx.beginPath()
      ctx.moveTo(Math.cos(ang) * (maxRadius + 5), Math.sin(ang) * (maxRadius + 5))
      ctx.lineTo(Math.cos(ang) * (maxRadius + 20), Math.sin(ang) * (maxRadius + 20))
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.stroke()
    })
    ctx.restore()

  }, [rotation, visibleLayers, selectedMountain])

  const normalizedRotation = ((rotation % 360) + 360) % 360
  const facingMountain = Math.floor(((360 - normalizedRotation + 7.5) % 360) / 15)
  const facingMountainData = TWENTY_FOUR_MOUNTAINS[facingMountain]

  return (
    <div className={styles.luopanContainer}>
      <motion.div 
        className={styles.luopanMain}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className={styles.luopanStand} />
        
        <div 
          ref={containerRef}
          className={styles.luopanDisk}
          onMouseDown={handleMouseDown}
          onTouchStart={handleElementTouchStart}
          style={{ cursor: 'grab' }}
        >
          <canvas 
            ref={canvasRef} 
            width={440} 
            height={440}
          />
          
          <div className={styles.compassNeedle}>
            <div className={styles.needleBase} />
            <div className={styles.needleRed} />
          </div>
        </div>

        <div className={styles.luopanOuterRing}>
          {Array.from({ length: 72 }).map((_, i) => (
            <div 
              key={i} 
              className={styles.ringMark}
              style={{ transform: `rotate(${i * 5}deg)` }}
            />
          ))}
        </div>
      </motion.div>

      <div className={styles.controlPanel}>
        <motion.div 
          className={styles.infoCard}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>🧭 罗盘信息</h3>
          <div className={styles.infoRow}>
            <span>坐向</span>
            <strong className={styles.directionHighlight}>
              {facingMountainData?.name}山
              {TWENTY_FOUR_MOUNTAINS[(facingMountain + 12) % 24]?.name}向
            </strong>
          </div>
          <div className={styles.infoRow}>
            <span>方位</span>
            <span>{normalizedRotation.toFixed(1)}°</span>
          </div>
          <div className={styles.infoRow}>
            <span>五行</span>
            <span style={{ color: facingMountainData?.color }}>
              {facingMountainData?.element}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>说明</span>
            <span className={styles.note}>{facingMountainData?.note}</span>
          </div>
        </motion.div>

        <div className={styles.buttonGroup}>
          <motion.button
            className={styles.layerButton}
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚙️ 图层控制
          </motion.button>

          <motion.button
            className={styles.helpButton}
            onClick={() => setShowHelpPanel(!showHelpPanel)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❓ 使用帮助
          </motion.button>
        </div>

        <AnimatePresence>
          {showHelpPanel && (
            <motion.div
              className={styles.helpPanel}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
            >
              <h4>📖 风水罗盘大全</h4>
              
              <div className={styles.helpSection}>
                <h5>🎯 基本操作</h5>
                <ul>
                  <li><strong>旋转：</strong>鼠标左键按住拖动，松手可惯性滑行</li>
                  <li><strong>移动端：</strong>手指直接触摸拖动即可</li>
                  <li><strong>坐向：</strong>红色十字线正对方向即为「坐山」</li>
                </ul>
              </div>

              <div className={styles.helpSection}>
                <h5>⭕ 七层罗经精义</h5>
                <ul>
                  <li><strong>▌天池</strong> — 太极初分，指南针定南北</li>
                  <li><strong>▌先天八卦</strong> — 乾坤定位，山泽通气，雷风相薄，水火不相射</li>
                  <li><strong>▌十二地支</strong> — 子寅辰午申戌为阳，丑卯巳未酉亥为阴</li>
                  <li><strong>▌二十四山</strong> — 每山15度，壬子癸亥壬为北方，三般卦</li>
                  <li><strong>▌一百二十分金</strong> — 每山5分金，旺相孤虚煞辨</li>
                  <li><strong>▌七十二穿山龙</strong> — 甲子起壬，透地六十龙取真气</li>
                  <li><strong>▌周天度数</strong> — 三百六十五度四分度之一</li>
                </ul>
              </div>

              <div className={styles.helpSection}>
                <h5>🏛️ 三大风水流派</h5>
                <div className={styles.schoolCard}>
                  <h6>【三合派】</h6>
                  <p>杨救贫真传，以十二长生论水，四维八干论峰，重寅午戌申子辰巳酉丑亥卯未四大局</p>
                </div>
                <div className={styles.schoolCard}>
                  <h6>【三元派】</h6>
                  <p>蒋大鸿玄空，元运挨星，一九合十，二八三七对待，重零正神与城门诀</p>
                </div>
                <div className={styles.schoolCard}>
                  <h6>【八宅派】</h6>
                  <p>游年九星起伏位，延年天医生气三吉方，五鬼六煞祸害绝命四凶方</p>
                </div>
              </div>

              <div className={styles.helpSection}>
                <h5>📚 分金要诀</h5>
                <p className={styles.prose}>
                  先辨孤虚与旺相，后察差错与空亡。
                  丙午丁巽避壬亥，甲庚壬丙取旺方。
                  乘气得分为真机，一线差池祸难当。
                </p>
              </div>

              <div className={styles.helpTip}>
                💡 真传一句话：罗经差一线，富贵不相见
              </div>
            </motion.div>
          )}

          {showLayerPanel && (
            <motion.div
              className={styles.layerPanel}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
            >
              <h4>显示图层</h4>
              {LUOPAN_LAYERS_CONFIG.map((layer) => (
                <label key={layer.id} className={styles.layerCheckbox}>
                  <input
                    type="checkbox"
                    checked={visibleLayers.includes(layer.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setVisibleLayers([...visibleLayers, layer.id])
                      } else {
                        setVisibleLayers(visibleLayers.filter(l => l !== layer.id))
                      }
                    }}
                  />
                  {layer.name}
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.hint}>
          💡 拖动罗盘可旋转，带惯性阻尼效果
        </div>
      </div>
    </div>
  )
}
