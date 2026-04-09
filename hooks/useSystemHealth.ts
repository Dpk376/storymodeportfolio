import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/store/usePortfolioStore'

export function useSystemHealth() {
  const progress = usePortfolioStore((s) => s.scrollProgress)
  const setIncident = usePortfolioStore((s) => s.triggerIncident)
  const prevProgress = useRef(progress)

  useEffect(() => {
    // Check if scrolled too fast
    const velocity = Math.abs(progress - prevProgress.current)
    if (velocity > 0.05) {
      setIncident(true)
      setTimeout(() => setIncident(false), 2000)
    }
    prevProgress.current = progress
  }, [progress, setIncident])
}
