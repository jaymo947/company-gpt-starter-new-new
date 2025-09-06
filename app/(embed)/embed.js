'use client'
import dynamic from 'next/dynamic'
export default function Embed() {
  const Page = dynamic(() => import('../page'), { ssr: false })
  return (
    <div className="embed" style={{ margin: '0 auto' }}>
      <Page />
    </div>
  )
}
