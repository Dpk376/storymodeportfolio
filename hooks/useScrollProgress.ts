import { useEffect } from 'react'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { getCheckpointForProgress } from '@/lib/sceneConfig'

export function useScrollProgress() {
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress)
  const setCheckpoint = usePortfolioStore((s) => s.setCheckpoint)

  useEffect(() => {
    const handleScroll = () => {
      // In a real Lenis setup, this would bind to Lenis' onScroll
      // But we can fallback to native scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = winScroll / height
      setScrollProgress(scrolled)
      setCheckpoint(getCheckpointForProgress(scrolled) as any)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress, setCheckpoint])
}
