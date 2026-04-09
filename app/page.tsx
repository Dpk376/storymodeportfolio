'use client'

import { usePortfolioStore } from '@/store/usePortfolioStore'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useVisitorMemory } from '@/hooks/useVisitorMemory'
import { useSystemHealth } from '@/hooks/useSystemHealth'
import { Experience } from '@/components/canvas/Experience'
import { BootScreen } from '@/components/overlays/BootScreen'
import { HUD } from '@/components/overlays/HUD'
import { CheckpointsOverlay } from '@/components/overlays/CheckpointsOverlay'
export default function Home() {
  const visitorName = usePortfolioStore((s) => s.visitorName)
  
  useVisitorMemory()
  useScrollProgress()
  useSystemHealth()

  return (
    <main className="relative w-full h-[800vh] bg-data-black overflow-x-hidden text-clean-white">
      {/* 800vh provides a long scroll region for the 8 checkpoints */}

      {/* Fixed UI Layer */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {!visitorName ? (
          <BootScreen />
        ) : (
          <>
            <HUD />
            <CheckpointsOverlay />
          </>
        )}
      </div>

      {/* Fixed Canvas Layer */}
      <div className="fixed inset-0 z-0 bg-data-black">
        <Experience />
      </div>
    </main>
  )
}
