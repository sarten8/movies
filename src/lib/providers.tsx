'use client'

import { SWRConfig } from 'swr'

// Fetcher global para SWR
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1 minuto
      }}
    >
      {children}
    </SWRConfig>
  )
}
