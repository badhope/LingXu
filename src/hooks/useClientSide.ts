'use client'

import { useState, useEffect } from 'react'

export function useClientSide<T>(clientValue: T, serverValue?: T) {
  const [value, setValue] = useState<T>(serverValue ?? clientValue)

  useEffect(() => {
    setValue(clientValue)
  }, [clientValue])

  return value
}

export function useClientTime() {
  const [time, setTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(new Date())

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return { time, mounted }
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
