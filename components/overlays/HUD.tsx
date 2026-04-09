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
      className="fixed inset-0 pointer-events-none z-40 text-electric-blue font-mono tracking-wider"
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-start justify-between p-8">
        <div className="flex flex-col">
          <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] mb-1">visitor_identification</span>
          <span className="text-clean-white text-xs font-light tracking-widest uppercase">{visitorName}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] mb-1">network_status</span>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            <span className="text-terminal-green text-xs font-light uppercase">link_established</span>
          </div>
          {usePortfolioStore((s) => s.easterEggs.ghostFound) && (
            <span className="text-electric-blue text-[8px] mt-1 pulse tracking-tighter opacity-80 uppercase">ghost_log_active</span>
          )}
        </div>
      </div>

      {/* Decorative Corners - Thinner */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-electric-blue/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-electric-blue/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-electric-blue/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-electric-blue/30" />

      {/* Bottom Progress UI */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-8">
        <div className="flex flex-col">
          <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] mb-2">datalink_synch</span>
          <div className="flex items-center space-x-4">
            <span className="text-xs font-extralight w-8">{percentage}%</span>
            <div className="w-24 h-[1px] bg-electric-blue/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-electric-blue/80 shadow-[0_0_8px_#00D4FF]"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[9px] opacity-40 uppercase tracking-[0.4em] mb-2">scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-electric-blue/80 to-transparent"
          />
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[9px] opacity-40 uppercase tracking-[0.2em] mb-1">logical_checkpoint</span>
          <span className="text-clean-white text-xs font-light">0X0{checkpoint}</span>
        </div>
      </div>
    </motion.div>
  )
}
