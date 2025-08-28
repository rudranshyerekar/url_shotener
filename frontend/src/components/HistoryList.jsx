import React from 'react'
import UrlCard from './UrlCard'

export default function HistoryList({ items = [] }) {
  if (!items.length) return <div className="small">No recent URLs yet.</div>
  return (
    <>
      {items.map((it, idx) => <UrlCard key={it.code || idx} item={it} />)}
    </>
  )
}
