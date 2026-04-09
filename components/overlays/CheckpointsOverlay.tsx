'use client'

import { usePortfolioStore } from '@/store/usePortfolioStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const CHECKPOINTS_DATA = [
  {
    id: 0,
    title: 'DEEPAK KUMAR',
    subtitle: 'SENIOR BACKEND ENGINEER',
    description: 'Specializing in high-throughput distributed systems & infrastructure.',
  },
  {
    id: 1,
    title: 'THE ARCHITECT',
    subtitle: 'ABOUT ME',
    description: 'Building resilient data pipelines, scalable APIs, and robust cloud deployments. If it runs on a server, I own its uptime.',
  },
  {
    id: 2,
    title: 'CORE STACK',
    subtitle: 'TECHNOLOGY',
    description: '> Java & Spring Boot\n> Distributed Kafka Streams\n> PostgreSQL Optimization\n> Kubernetes Orchestration',
  },
  {
    id: 3,
    title: 'KAFKA HIGHWAY',
    subtitle: 'DATA STREAMING',
    description: 'High-throughput event logs. 1500+ messages flying across partition lines in real time.',
  },
  {
    id: 4,
    title: 'MICROSERVICES CITY',
    subtitle: 'ORCHESTRATION',
    description: 'Stateless nodes clustered by domain. Autoscaling enabled. Zero downtime assumed.',
  },
  {
    id: 5,
    title: 'DATABASE VAULT',
    subtitle: 'PERSISTENCE',
    description: 'The single source of truth. ACID-compliant monolithic storage bolted under strict network access.',
  },
  {
    id: 6,
    title: 'KUBERNETES CLOUD',
    subtitle: 'INFRASTRUCTURE',
    description: 'Floating abstraction layer. Pods scheduled gracefully across distributed worker nodes.',
  },
  {
    id: 7,
    title: 'OPEN SOURCE ORBIT',
    subtitle: 'CONTRIBUTOR',
    description: 'Giving back. Feature migrations and architectural revamps for Apache Fineract & the GSoC community.',
  },
  {
    id: 8,
    title: 'RESPONSE TERMINAL',
    subtitle: 'ESTABLISH CONNECTION',
    description: 'Kernel traversal complete. Systems operational.\n\n> deepak.kumar@example.com\n> github.com/deepakabi\n> linkedin.com/in/deepakabi\n\n[CONNECTION STABLE]',
  }
]

export function CheckpointsOverlay() {
  const checkpoint = usePortfolioStore((s) => s.checkpoint)
  const activeData = CHECKPOINTS_DATA.find((c) => c.id === checkpoint)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-start p-12 lg:p-32">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeData.id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-4 pointer-events-auto"
            >
              <motion.div 
                variants={letterVariants}
                className="text-electric-blue/60 font-mono text-[10px] tracking-[0.3em] mb-4 uppercase"
              >
                // 0x0{activeData.id} . {activeData.subtitle}
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-thin text-clean-white leading-[1.1] tracking-tighter mb-8 overflow-hidden flex flex-wrap">
                {activeData.title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={char === ' ' ? 'mr-4' : ''}
                  >
                    {char}
                  </motion.span>
                ))}
              </h2>

              <motion.div 
                variants={letterVariants}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-clean-white/40 font-extralight text-sm md:text-base leading-relaxed tracking-wide max-w-md border-l border-electric-blue/20 pl-6"
              >
                {activeData.description}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
