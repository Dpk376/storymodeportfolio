import { useEffect } from 'react'
import { usePortfolioStore } from '@/store/usePortfolioStore'

export function useVisitorMemory() {
  const hydrateVisitor = usePortfolioStore((s) => s.hydrateVisitor)

  useEffect(() => {
    hydrateVisitor()
  }, [hydrateVisitor])
}
