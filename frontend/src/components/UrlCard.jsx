import React from 'react'

function copy(text) {
  navigator.clipboard.writeText(text).then(()=> alert('Copied!'))
}

export default function UrlCard({ item }) {
  return (
    <div className="card" style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:600}}>{item.originalUrl}</div>
          <div className="url-meta">
            <a href={item.shortUrl} target="_blank" rel="noreferrer">{item.shortUrl}</a>
          </div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={() => window.open(item.shortUrl, '_blank')}>Open</button>
          <button className="btn" onClick={() => copy(item.shortUrl)}>Copy</button>
        </div>
      </div>
      {item.expiresAt && <div className="url-meta">Expires at: {new Date(item.expiresAt).toLocaleString()}</div>}
      <div className="url-meta">Created: {item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</div>
    </div>
  )
}
