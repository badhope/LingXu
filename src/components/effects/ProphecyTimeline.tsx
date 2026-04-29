'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProphecyNode {
  id: number
  year: number
  bookName: string
  title: string
  fulfilled: boolean
  confidence: number
  color: string
  icon: string
  detail: string
}

const PROPHECY_TIMELINE: ProphecyNode[] = [
  { id: 1, year: 650, bookName: '推背图', title: '武则天称帝', fulfilled: true, confidence: 100, color: '#ef4444', icon: '👑', detail: '推背图第3像：日月当空，照临下土。扑朔迷离，不文亦武。' },
  { id: 2, year: 755, bookName: '推背图', title: '安史之乱', fulfilled: true, confidence: 100, color: '#ef4444', icon: '⚔️', detail: '推背图第5像：杨花飞，蜀道难。渔阳鼙鼓过潼关，此日君王幸剑山。' },
  { id: 3, year: 880, bookName: '推背图', title: '黄巢起义', fulfilled: true, confidence: 100, color: '#ef4444', icon: '🔥', detail: '推背图第9像：满山桃李子，尽灭无头树。' },
  { id: 4, year: 1127, bookName: '梅花诗', title: '靖康之耻', fulfilled: true, confidence: 98, color: '#eab308', icon: '🏯', detail: '梅花诗第一首：荡荡天门万古开，几人归去几人来。' },
  { id: 5, year: 1279, bookName: '梅花诗', title: '崖山之难', fulfilled: true, confidence: 95, color: '#eab308', icon: '🌊', detail: '梅花诗第二首：湖山一梦事全非，再见云龙向北飞。' },
  { id: 6, year: 1368, bookName: '烧饼歌', title: '朱元璋建国', fulfilled: true, confidence: 98, color: '#f97316', icon: '🦁', detail: '烧饼歌：雨水草头真主出，路人路上一时行。' },
  { id: 7, year: 1449, bookName: '烧饼歌', title: '土木堡之变', fulfilled: true, confidence: 95, color: '#f97316', icon: '🏇', detail: '烧饼歌：八千女鬼乱朝纲。' },
  { id: 8, year: 1644, bookName: '推背图', title: '满清入关', fulfilled: true, confidence: 99, color: '#ef4444', icon: '🏛️', detail: '推背图第33像：黄河水清，气顺则治。' },
  { id: 9, year: 1851, bookName: '推背图', title: '太平天国', fulfilled: true, confidence: 99, color: '#ef4444', icon: '✝️', detail: '推背图第37像：太平又见血花飞，五色章成里外衣。' },
  { id: 10, year: 1900, bookName: '武侯百年乩', title: '八国联军', fulfilled: true, confidence: 90, color: '#3b82f6', icon: '🌍', detail: '武侯百年乩：鼠年猴月大乱起，白骨如丘满路岐。' },
  { id: 11, year: 1911, bookName: '烧饼歌', title: '辛亥革命', fulfilled: true, confidence: 97, color: '#f97316', icon: '🇨🇳', detail: '烧饼歌：手执钢刀九十九，杀尽胡儿方罢手。' },
  { id: 12, year: 1937, bookName: '金陵塔碑文', title: '日本侵华', fulfilled: true, confidence: 95, color: '#22c55e', icon: '💥', detail: '金陵塔碑文：拆去金陵塔，关门自己杀。日出东，月落西。' },
  { id: 13, year: 1945, bookName: '推背图', title: '抗战胜利', fulfilled: true, confidence: 100, color: '#ef4444', icon: '🎉', detail: '推背图第39像：旭初升，人都哭。十二月中气不和，南山有雀北山罗。' },
  { id: 14, year: 1949, bookName: '武侯百年乩', title: '新中国成立', fulfilled: true, confidence: 92, color: '#3b82f6', icon: '🌟', detail: '武侯百年乩：百年结束出伟人，红旗倒尽国运新。' },
  { id: 15, year: 1966, bookName: '金陵塔碑文', title: '文革浩劫', fulfilled: true, confidence: 90, color: '#22c55e', icon: '📕', detail: '金陵塔碑文：红花开尽白花开，紫金山上美人来。' },
  { id: 16, year: 1978, bookName: '金陵塔碑文', title: '改革开放', fulfilled: true, confidence: 88, color: '#22c55e', icon: '💹', detail: '金陵塔碑文：德逍遥，意逍遥，百载繁华一梦消。' },
  { id: 17, year: 2020, bookName: '金陵塔碑文', title: '新冠疫情', fulfilled: true, confidence: 85, color: '#22c55e', icon: '🦠', detail: '金陵塔碑文：二四八，瘟疫死，凡民大难十室九空死。' },
  { id: 18, year: 2025, bookName: '推背图', title: '第43像', fulfilled: false, confidence: 50, color: '#ef4444', icon: '❓', detail: '推背图第43像：君非君，臣非臣，始艰危，终克定。' },
  { id: 19, year: 2030, bookName: '马前课', title: '圣人出世', fulfilled: false, confidence: 40, color: '#a855f7', icon: '✨', detail: '马前课第12课：拯患救难，是唯圣人。阳复而治，晦极生明。' },
  { id: 20, year: 2050, bookName: '马前课', title: '天下大同', fulfilled: false, confidence: 30, color: '#a855f7', icon: '🌈', detail: '马前课第13课：贤不遗野，天下一家。无名无德，光耀中华。' },
]

const BOOKS = [
  { name: '推背图', color: '#ef4444', icon: '📜' },
  { name: '烧饼歌', color: '#f97316', icon: '🥞' },
  { name: '梅花诗', color: '#eab308', icon: '🌸' },
  { name: '金陵塔碑文', color: '#22c55e', icon: '🗼' },
  { name: '武侯百年乩', color: '#3b82f6', icon: '⚔️' },
  { name: '马前课', color: '#a855f7', icon: '🐴' },
  { name: '互联网预言', color: '#ec4899', icon: '💻', isEaster: true },
]

const EASTER_EGG_PROPHECIES = [
  { id: 101, year: 2077, bookName: '互联网预言', title: '赛博朋克元年', fulfilled: false, confidence: 99, color: '#ec4899', icon: '🦾', detail: '夜之城开业！义体改造普及，街头雇佣兵开始接单。', isEaster: true },
  { id: 102, year: 2033, bookName: '互联网预言', title: '三体人降临', fulfilled: false, confidence: 42, color: '#06b6d4', icon: '👽', detail: '不要回答！不要回答！不要回答！', isEaster: true },
  { id: 103, year: 2045, bookName: '互联网预言', title: '技术奇点', fulfilled: false, confidence: 69, color: '#8b5cf6', icon: '🤖', detail: 'AI超越人类，开始自己写代码。程序员集体失业。', isEaster: true },
  { id: 104, year: 2028, bookName: '互联网预言', title: '国产操作系统统一', fulfilled: false, confidence: 1, color: '#ef4444', icon: '🖥️', detail: '今年一定是国产操作系统元年！（每年都这么说）', isEaster: true },
  { id: 105, year: 2060, bookName: '互联网预言', title: '碳中和实现', fulfilled: false, confidence: 50, color: '#22c55e', icon: '🌱', detail: '冰川开始回溯，北极熊重新就业。', isEaster: true },
]

const PROPHECY_MEMES = [
  { threshold: 100, message: '🎯 神预言！建议这位大师立刻出山算彩票' },
  { threshold: 95, message: '⭐ 准得可怕！这不是预言，这是剧透吧？' },
  { threshold: 85, message: '👍 很准！建议给袁隆平爷爷磕一个' },
  { threshold: 70, message: '🤔 勉强算对...反正古人说话都模棱两可' },
  { threshold: 50, message: '🤷 这不瞎蒙吗？我上我也行' },
  { threshold: 30, message: '😅 纯纯马后炮！历史全靠后人附会' },
  { threshold: 0, message: '💩 一本正经地胡说八道！' },
]

export default function ProphecyTimeline() {
  const [selectedNode, setSelectedNode] = useState<ProphecyNode | null>(null)
  const [filterBook, setFilterBook] = useState<string>('all')
  const [showFulfilled, setShowFulfilled] = useState<'all' | 'yes' | 'no'>('all')
  const [memeComment, setMemeComment] = useState<string | null>(null)
  const [showEasterEggs, setShowEasterEggs] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const allProphecies = showEasterEggs
    ? [...PROPHECY_TIMELINE, ...EASTER_EGG_PROPHECIES]
    : PROPHECY_TIMELINE

  const filteredNodes = allProphecies.filter(n => {
    if (filterBook !== 'all' && n.bookName !== filterBook) return false
    if (showFulfilled === 'yes' && !n.fulfilled) return false
    if (showFulfilled === 'no' && n.fulfilled) return false
    return true
  })

  const handleNodeClick = useCallback((node: ProphecyNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node)

    if (Math.random() < 0.3) {
      const meme = PROPHECY_MEMES.find(m => node.confidence >= m.threshold)
      if (meme) {
        setMemeComment(meme.message)
        setTimeout(() => setMemeComment(null), 3500)
      }
    }
  }, [selectedNode])

  const yearToX = useCallback((year: number) => {
    const minYear = 600
    const maxYear = 2100
    return ((year - minYear) / (maxYear - minYear)) * 100
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterBook('all')}
            style={{
              padding: '0.5rem 1rem',
              background: filterBook === 'all' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid ' + (filterBook === 'all' ? 'rgba(168, 85, 247, 0.6)' : 'rgba(255, 255, 255, 0.2)'),
              borderRadius: '20px',
              color: filterBook === 'all' ? '#a855f7' : 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: filterBook === 'all' ? 'bold' : 'normal',
            }}
          >
            全部
          </motion.button>
          {BOOKS.map(book => (
            <motion.button
              key={book.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterBook(book.name)}
              style={{
                padding: '0.5rem 1rem',
                background: filterBook === book.name ? book.color + '30' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid ' + (filterBook === book.name ? book.color + '80' : 'rgba(255, 255, 255, 0.2)'),
                borderRadius: '20px',
                color: filterBook === book.name ? book.color : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: filterBook === book.name ? 'bold' : 'normal',
              }}
            >
              {book.icon} {book.name}
            </motion.button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEasterEggs(!showEasterEggs)}
            style={{
              padding: '0.5rem 1rem',
              background: showEasterEggs ? 'rgba(236, 72, 153, 0.3)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid ' + (showEasterEggs ? 'rgba(236, 72, 153, 0.6)' : 'rgba(255, 255, 255, 0.2)'),
              borderRadius: '20px',
              color: showEasterEggs ? '#ec4899' : 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: showEasterEggs ? 'bold' : 'normal',
            }}
          >
            🥚 彩蛋模式 {showEasterEggs ? 'ON' : 'OFF'}
          </motion.button>

          {[
            { key: 'all', label: '全部' },
            { key: 'yes', label: '✅ 已应验' },
            { key: 'no', label: '🔮 待应验' },
          ].map(opt => (
            <motion.button
              key={opt.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFulfilled(opt.key as typeof showFulfilled)}
              style={{
                padding: '0.5rem 1rem',
                background: showFulfilled === opt.key ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid ' + (showFulfilled === opt.key ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.2)'),
                borderRadius: '20px',
                color: showFulfilled === opt.key ? '#a855f7' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div ref={containerRef} style={{
        position: 'relative',
        height: '300px',
        padding: '2rem 0',
        overflowX: 'auto',
        overflowY: 'visible',
      }}>
        <div style={{
          position: 'sticky',
          left: 0,
          right: 0,
          top: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.8) 50%, rgba(168, 85, 247, 0.3) 100%)',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }} />

        {[700, 900, 1100, 1300, 1500, 1700, 1900, 2100].map(year => (
          <div
            key={year}
            style={{
              position: 'absolute',
              left: `${yearToX(year)}%`,
              top: '55%',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.4)',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            {year}年
          </div>
        ))}

        {filteredNodes.map((node, i) => {
          const isTop = i % 2 === 0
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleNodeClick(node)}
              style={{
                position: 'absolute',
                left: `${yearToX(node.year)}%`,
                top: isTop ? '15%' : '65%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                cursor: 'pointer',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.3, zIndex: 100 }}
                animate={{
                  boxShadow: selectedNode?.id === node.id
                    ? `0 0 20px ${node.color}`
                    : `0 0 10px ${node.color}60`,
                }}
                style={{
                  width: selectedNode?.id === node.id ? '50px' : '40px',
                  height: selectedNode?.id === node.id ? '50px' : '40px',
                  borderRadius: '50%',
                  background: node.fulfilled
                    ? `radial-gradient(circle, ${node.color} 0%, ${node.color}88 100%)`
                    : `radial-gradient(circle, ${node.color}66 0%, ${node.color}33 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: selectedNode?.id === node.id ? '1.5rem' : '1.25rem',
                  border: '2px solid ' + node.color,
                  transition: 'all 0.3s',
                }}
              >
                {node.icon}
              </motion.div>

              <div style={{
                position: 'absolute',
                [isTop ? 'bottom' : 'top']: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.7rem',
                color: selectedNode?.id === node.id ? node.color : 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'nowrap',
                fontWeight: selectedNode?.id === node.id ? 'bold' : 'normal',
                maxWidth: '80px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {node.title}
              </div>

              <div style={{
                position: 'absolute',
                left: '50%',
                width: '1px',
                height: isTop ? '75px' : '60px',
                top: isTop ? '40px' : '-60px',
                background: node.color + '60',
                transform: 'translateX(-50%)',
              }} />
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {memeComment && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(168, 85, 247, 0.95))',
              borderRadius: '12px',
              zIndex: 200,
              boxShadow: '0 0 50px rgba(236, 72, 153, 0.5)',
              whiteSpace: 'nowrap',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {memeComment}
          </motion.div>
        )}

        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, ' + selectedNode.color + '20 0%, rgba(15, 15, 35, 0.95) 100%)',
              borderRadius: '12px',
              border: '1px solid ' + selectedNode.color + '60',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${selectedNode.color} 0%, ${selectedNode.color}66 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: `0 0 30px ${selectedNode.color}60`,
              }}>
                {selectedNode.icon}
              </div>
              <div>
                <h4 style={{ color: selectedNode.color, fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                  {selectedNode.title}
                </h4>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <span>{selectedNode.year}年</span>
                  <span>{selectedNode.bookName}</span>
                  <span style={{ color: selectedNode.fulfilled ? '#22c55e' : '#eab308' }}>
                    {selectedNode.fulfilled ? '✅ 已应验' : '🔮 待应验'}
                  </span>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.25rem',
                }}>
                  应验度
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: selectedNode.color,
                }}>
                  {selectedNode.confidence}%
                </div>
              </div>
            </div>

            <p style={{
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              borderLeft: `4px solid ${selectedNode.color}`,
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'serif',
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}>
              「{selectedNode.detail}」
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.5)',
      }}>
        <span>共 {filteredNodes.length} 个预言</span>
        <span style={{ color: '#22c55e' }}>✅ 已应验: {filteredNodes.filter(n => n.fulfilled).length}</span>
        <span style={{ color: '#eab308' }}>🔮 待应验: {filteredNodes.filter(n => !n.fulfilled).length}</span>
      </div>
    </div>
  )
}
