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
  
  // We only care about checkpoints 0, 1, 2 for now based on the plan
  const activeData = CHECKPOINTS_DATA.find((c) => c.id === checkpoint)

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-start p-12 lg:p-24">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
              className="bg-data-black/40 backdrop-blur-md border-l-4 border-electric-blue p-8 pointer-events-auto shadow-[0_0_30px_rgba(0,212,255,0.1)]"
            >
              <div className="text-terminal-green font-mono text-sm tracking-widest mb-2">
                0x0{activeData.id} // {activeData.subtitle}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-clean-white leading-tight tracking-tight mb-6">
                {activeData.title}
              </h2>
              <div className="text-clean-white/70 font-sans text-lg whitespace-pre-line leading-relaxed">
                {activeData.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
