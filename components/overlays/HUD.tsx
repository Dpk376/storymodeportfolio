'use client'

import { usePortfolioStore } from '@/store/usePortfolioStore'
import { useSystemHealth } from '@/hooks/useSystemHealth'
import { motion } from 'framer-motion'

export function HUD() {
  const visitorName = usePortfolioStore((s) => s.visitorName)
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress)
  const checkpoint = usePortfolioStore((s) => s.checkpoint)
  
  // Use a custom hook or basic state to get FPS (simplified for HUD)
  // Our useSystemHealth hook updates `usePortfolioStore` indirectly or we can just read from scene
  // For now, let's keep it simple with what's available
  
  const percentage = Math.min(100, Math.max(0, Math.floor(scrollProgress * 100)))

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed inset-0 pointer-events-none z-40 text-electric-blue font-mono text-sm tracking-wider"
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-start justify-between p-6">
        <div className="flex flex-col">
          <span className="opacity-60 text-xs">VISITOR_ID</span>
          <span className="text-clean-white">{visitorName}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="opacity-60 text-xs">SYS_STATUS</span>
          <span className="text-terminal-green">ONLINE</span>
          {usePortfolioStore((s) => s.easterEggs.ghostFound) && (
            <span className="text-electric-blue text-[10px] mt-1 pulse tracking-tighter shadow-glow">GHOST_LINK_ACTIVE</span>
          )}
        </div>
      </div>

      {/* Crosshairs/Framing */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-electric-blue opacity-50" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-electric-blue opacity-50" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-electric-blue opacity-50" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-electric-blue opacity-50" />

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">
        <div className="flex flex-col">
          <span className="opacity-60 text-xs">DATALINK_PROGRESS</span>
          <div className="flex items-center space-x-2 mt-1">
            <span className="w-12 text-right">{percentage}%</span>
            <div className="w-32 h-1 bg-data-black border border-electric-blue/30 overflow-hidden">
              <div 
                className="h-full bg-electric-blue shadow-[0_0_8px_#00D4FF]"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="opacity-60 text-xs">ACTIVE_CHECKPOINT</span>
          <span className="text-clean-white">0x{checkpoint.toString(16).toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  )
}
