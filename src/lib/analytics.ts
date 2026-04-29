'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface LayoutShift extends PerformanceEntry {
    value: number
    hadRecentInput: boolean
  }
}

interface PerformanceMetrics {
  fp: number | null
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

interface AnalyticsEvent {
  event: string
  category?: string
  label?: string
  value?: number
  timestamp: number
  pathname?: string
}

class Analytics {
  private metrics: PerformanceMetrics = {
    fp: null,
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  }

  private events: AnalyticsEvent[] = []
  private maxEvents = 100

  track(event: string, options?: Omit<AnalyticsEvent, 'event' | 'timestamp'>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      pathname: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...options,
    }

    this.events.push(analyticsEvent)
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 [Analytics]`, analyticsEvent)
    }
  }

  trackPageView(pathname: string) {
    this.track('page_view', { label: pathname })
  }

  trackClick(element: string, label?: string) {
    this.track('click', { category: 'interaction', label: element || label })
  }

  setMetric(key: keyof PerformanceMetrics, value: number) {
    this.metrics[key] = value
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ [Performance] ${key.toUpperCase()}: ${value.toFixed(2)}ms`)
    }
  }

  getMetrics() {
    return { ...this.metrics }
  }

  getEvents() {
    return [...this.events]
  }

  report() {
    if (process.env.NODE_ENV === 'development') {
      console.log('📈 Performance Report:', this.metrics)
      console.log('📊 Events:', this.events.length, 'events recorded')
    }
  }
}

const analytics = new Analytics()

export function usePerformance() {
  const observed = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observerEntries = (entries: PerformanceEntryList, type: string) => {
      entries.forEach((entry) => {
        const id = `${type}-${entry.name || entry.startTime}`
        if (observed.current.has(id)) return
        observed.current.add(id)

        switch (type) {
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming
            analytics.setMetric('ttfb', navEntry.responseStart)
            break
          case 'paint':
            const paintEntry = entry as PerformancePaintTiming
            if (entry.name === 'first-paint') analytics.setMetric('fp', paintEntry.startTime)
            if (entry.name === 'first-contentful-paint') analytics.setMetric('fcp', paintEntry.startTime)
            break
          case 'largest-contentful-paint':
            const lcpEntry = entry as LargestContentfulPaint
            analytics.setMetric('lcp', lcpEntry.startTime)
            break
          case 'first-input':
            const fidEntry = entry as PerformanceEventTiming
            analytics.setMetric('fid', fidEntry.processingStart - fidEntry.startTime)
            break
          case 'layout-shift':
            const clsEntry = entry as LayoutShift
            if (!clsEntry.hadRecentInput) {
              const currentCls = analytics.getMetrics().cls || 0
              analytics.setMetric('cls', currentCls + clsEntry.value)
            }
            break
        }
      })
    }

    const observers: PerformanceObserver[] = []

    const observe = (type: string) => {
      try {
        const observer = new PerformanceObserver((list) => observerEntries(list.getEntries(), type))
        observer.observe({ type, buffered: true } as PerformanceObserverInit)
        observers.push(observer)
      } catch (e) {
      }
    }

    observe('navigation')
    observe('paint')
    observe('largest-contentful-paint')
    observe('first-input')
    observe('layout-shift')

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return analytics
}

export function PerformanceMonitor() {
  usePerformance()

  useEffect(() => {
    analytics.trackPageView(typeof window !== 'undefined' ? window.location.pathname : '/')
  }, [])

  return null
}

export { analytics }
