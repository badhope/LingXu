'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MOON_PHASES,
  TWENTY_FOUR_JIEQI,
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  SHI_ER_SHEN,
  DAILY_ACTIVITIES,
  CALENDAR_MANUAL,
} from './calendar-constants'
import styles from './Calendar.module.scss'

function getMoonPhase(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  let c = 0
  let e = 0
  let jd = 0
  let b = 0

  if (month < 3) {
    c = year - 1
    e = month + 12
  } else {
    c = year
    e = month
  }

  jd = day + Math.floor(153 * e / 5) + 365 * c + Math.floor(c / 4) - Math.floor(c / 100) + Math.floor(c / 400) + 1721119
  b = jd - 2451550.1
  b = b / 29.530588853
  b = b - Math.floor(b)
  
  const phaseIndex = Math.floor(b * 8) % 8
  return MOON_PHASES[phaseIndex]
}

function getGanZhiDay(date: Date) {
  const baseDate = new Date(2024, 0, 1)
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  const stemIndex = (daysDiff + 9) % 10
  const branchIndex = (daysDiff + 1) % 12
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    full: HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex],
  }
}

function getTwelveGod(date: Date) {
  const monthBranch = Math.floor((date.getMonth() + 2) % 12)
  const dayBranch = getGanZhiDay(date).branch
  const dayBranchIndex = EARTHLY_BRANCHES.indexOf(dayBranch)
  const godIndex = (dayBranchIndex - monthBranch + 12) % 12
  return SHI_ER_SHEN[godIndex]
}

function getNearbyJieqi(date: Date) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const solarLongitude = ((dayOfYear - 80) / 365.25 * 360 + 360) % 360
  
  let nearest = TWENTY_FOUR_JIEQI[0]
  let minDiff = 360
  
  TWENTY_FOUR_JIEQI.forEach(jq => {
    const diff = Math.abs(jq.solarTerm - solarLongitude)
    const normalizedDiff = diff > 180 ? 360 - diff : diff
    if (normalizedDiff < minDiff) {
      minDiff = normalizedDiff
      nearest = jq
    }
  })
  
  return {
    jieqi: nearest,
    daysAway: Math.round(minDiff / 360 * 365.25),
  }
}

function getSuitableActivities(twelveGod: typeof SHI_ER_SHEN[number]) {
  const favorableGods = ['除', '定', '执', '成', '开']
  const isFavorable = favorableGods.includes(twelveGod.id)
  
  return DAILY_ACTIVITIES.filter(act => {
    if (isFavorable) return Math.random() > 0.3
    return Math.random() > 0.7
  })
}

export default function CalendarPanel() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showManual, setShowManual] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const moonPhase = useMemo(() => getMoonPhase(currentDate), [currentDate])
  const ganzhi = useMemo(() => getGanZhiDay(currentDate), [currentDate])
  const twelveGod = useMemo(() => getTwelveGod(currentDate), [currentDate])
  const jieqiInfo = useMemo(() => getNearbyJieqi(currentDate), [currentDate])
  const suitableActivities = useMemo(() => getSuitableActivities(twelveGod), [twelveGod])

  const zodiacIndex = (currentDate.getFullYear() - 4) % 12
  const zodiac = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'][zodiacIndex]

  return (
    <div className={styles.calendarContainer}>
      <motion.div
        className={styles.astronomyPanel}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>🌙 天象</h2>
        
        <motion.div 
          className={styles.moonDisplay}
          animate={{
            boxShadow: `0 0 ${moonPhase.light}px rgba(255, 255, 255, ${moonPhase.light / 200})`,
          }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className={styles.moonIcon}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {moonPhase.icon}
          </motion.div>
          
          <div className={styles.moonInfo}>
            <h3>{moonPhase.name}</h3>
            <p>{moonPhase.term}</p>
            <div className={styles.lightBar}>
              <motion.div 
                className={styles.lightFill}
                initial={{ width: 0 }}
                animate={{ width: `${moonPhase.light}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
            <span className={styles.lightText}>亮度 {moonPhase.light}%</span>
          </div>
        </motion.div>

        <div className={styles.jieqiCard}>
          <div className={styles.jieqiHeader}>
            <span className={styles.jieqiName}>{jieqiInfo.jieqi.name}</span>
            <span className={styles.jieqiRemark}>{jieqiInfo.jieqi.remark}</span>
          </div>
          <p className={styles.jieqiDistance}>
            {jieqiInfo.daysAway === 0 ? '🌟 今日' : `距${jieqiInfo.daysAway}日`} · {jieqiInfo.jieqi.jy}
          </p>
        </div>

        <button
          className={styles.manualToggle}
          onClick={() => setShowManual(!showManual)}
        >
          📜 {showManual ? '收起' : '董公择日要诀'}
        </button>

        <AnimatePresence>
          {showManual && (
            <motion.div
              className={styles.manualPanel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <p className={styles.manualHistory}>
                {CALENDAR_MANUAL.history}
              </p>
              <div className={styles.principles}>
                {CALENDAR_MANUAL.principles.map((p, i) => (
                  <div key={i} className={styles.principleItem}>
                    {p}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.almanacPanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.panelTitle}>📅 通胜</h2>

        <div className={styles.dateHeader}>
          <div className={styles.solarDate}>
            <span className={styles.dayNum}>{currentDate.getDate()}</span>
            <div>
              <p>{currentDate.getFullYear()}年{currentDate.getMonth() + 1}月</p>
              <p className={styles.weekday}>
                {['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentDate.getDay()]}
              </p>
            </div>
          </div>

          <div className={styles.lunarInfo}>
            <div className={styles.lunarYear}>
              {ganzhi.full}年 · {zodiac}年
            </div>
            <div className={styles.lunarDay}>
              今日 · {ganzhi.full}日
            </div>
          </div>
        </div>

        <div className={styles.twelveGodRow}>
          <span className={styles.godLabel}>十二神</span>
          <span className={styles.godName}>{twelveGod.name}</span>
          <span className={styles.godNote}>{twelveGod.note}</span>
        </div>

        <div className={styles.suitableSection}>
          <h4>✅ 宜</h4>
          <div className={styles.activityTags}>
            {suitableActivities.map(act => (
              <span key={act.id} className={`${styles.activityTag} ${styles.suitable}`}>
                {act.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.suitableSection}>
          <h4>❌ 忌</h4>
          <div className={styles.activityTags}>
            {DAILY_ACTIVITIES
              .filter(a => !suitableActivities.find(s => s.id === a.id))
              .slice(0, 3)
              .map(act => (
                <span key={act.id} className={`${styles.activityTag} ${styles.avoid}`}>
                  {act.name}
                </span>
              ))}
          </div>
        </div>

        <div className={styles.jieqiStrip}>
          {TWENTY_FOUR_JIEQI.map((jq, i) => (
            <div
              key={jq.id}
              className={`${styles.jieqiDot} ${jq.id === jieqiInfo.jieqi.id ? styles.currentJieqi : ''}`}
              title={`${jq.name} - ${jq.remark}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
