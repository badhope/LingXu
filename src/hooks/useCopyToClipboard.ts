import { useState, useCallback } from 'react'

interface UseCopyToClipboardOptions {
  timeout?: number
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { timeout = 2000, onSuccess, onError } = options

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(true)
        setError(null)
        onSuccess?.()

        if (timeout) {
          setTimeout(() => setIsCopied(false), timeout)
        }
      } catch (e) {
        const err = e as Error
        setError(err)
        onError?.(err)
      }
    },
    [timeout, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setIsCopied(false)
    setError(null)
  }, [])

  return { isCopied, error, copy, reset } as const
}
