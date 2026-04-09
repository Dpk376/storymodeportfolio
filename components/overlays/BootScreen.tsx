'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const BOOT_SEQUENCE = [
  'INITIALIZING KERNEL...',
  'MOUNTING FILE SYSTEMS... [OK]',
  'STARTING SYSTEM LOGGER... [OK]',
  'STARTING KUBERNETES CONTROL PLANE... [OK]',
  'ESTABLISHING KAFKA BROKER CONNECTIONS... [OK]',
  'VERIFYING POSTGRESQL DATA VAULT... [OK]',
  'LOADING WEBGL CONTEXT... [SUCCESS]',
  'COMPILING SHADERS... [SUCCESS]',
  'AWAITING USER IDENTIFICATION...',
]

export function BootScreen() {
  const setVisitorName = usePortfolioStore((state) => state.setVisitorName)
  const [logs, setLogs] = useState<string[]>([])
  const [isBooted, setIsBooted] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-run boot sequence
  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = []
    
    BOOT_SEQUENCE.forEach((log, index) => {
      const id = setTimeout(() => {
        setLogs((prev) => [...prev, log])
        if (index === BOOT_SEQUENCE.length - 1) {
          setIsBooted(true)
        }
      }, index * 300) // Fast 300ms logs
      timeoutIds.push(id)
    })

    return () => timeoutIds.forEach(clearTimeout)
  }, [])

  // Auto focus input
  useEffect(() => {
    if (isBooted && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isBooted])

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setVisitorName(inputValue.trim().toUpperCase())
    }
  }

  return (
    <div 
      className="absolute inset-0 bg-data-black text-terminal-green font-mono p-8 overflow-hidden z-50 pointer-events-auto"
      onClick={handleFocus}
    >
      <div className="max-w-3xl mx-auto flex flex-col h-full justify-end pb-24">
        {/* Terminal output */}
        <div className="flex flex-col space-y-2 mb-8">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm md:text-base opacity-80"
            >
              <span className="text-gray-500 mr-4">[{(i * 0.3).toFixed(3)}]</span>
              {log}
            </motion.div>
          ))}
        </div>

        {/* Input prompt */}
        <AnimatePresence>
          {isBooted && (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={onSubmit}
              className="flex items-center space-x-4 mt-8"
            >
              <span className="text-electric-blue">root@deepak_system:~#</span>
              <span className="text-alert-amber">ENTER VISITOR IDENTIFICATION:</span>
              <div className="relative flex-1 max-w-[300px]">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-clean-white uppercase"
                  autoComplete="off"
                  spellCheck="false"
                />
                {!inputValue && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="absolute left-0 top-0 bottom-0 w-3 bg-clean-white"
                  />
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      
      {/* Overlay CRT scanline effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
    </div>
  )
}
