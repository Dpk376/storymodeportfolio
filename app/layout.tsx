import type { Metadata } from 'next'
import { jetbrainsMono, inter } from './fonts'
import { LenisProvider } from '@/components/providers/LenisProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Deepak Kumar — Senior Backend Engineer',
  description: 'Distributed Systems | Java, Kafka, AWS | 5 years building high-throughput event pipelines and cloud-native microservices.',
  keywords: ['backend engineer', 'distributed systems', 'Java', 'Kafka', 'AWS', 'Kubernetes', 'Apache Fineract'],
  openGraph: {
    title: 'Deepak Kumar — Senior Backend Engineer',
    description: 'An immersive journey through distributed system infrastructure.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
