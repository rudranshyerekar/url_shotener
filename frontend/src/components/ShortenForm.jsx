import React, { useState } from 'react'
import { shortenUrl } from '../services/api'

export default function ShortenForm({ onSuccess }) {
  const [url, setUrl] = useState('')
  const [expiry, setExpiry] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!url.trim()) { setError('Enter a URL'); return }
    setLoading(true)
    try {
      const data = await shortenUrl(url.trim(), expiry ? Number(expiry) : undefined)
      setResult(data)
      onSuccess && onSuccess({
        code: data.code,
        shortUrl: data.shortUrl,
        originalUrl: url.trim(),
        createdAt: new Date().toISOString(),
        expiresAt: data.expiresAt || null
      })
      setUrl('')
      setExpiry('')
    } catch (err) {
      setError(err.message || 'Failed to shorten')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy(text) {
    await navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom:8}}>
        <input className="input" placeholder="https://example.com/very/long/url" value={url} onChange={e=>setUrl(e.target.value)} />
      </div>

      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input className="number" placeholder="Expiry days (optional)" type="number" min="1" max="365" value={expiry} onChange={e=>setExpiry(e.target.value)} />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Shortening...' : 'Shorten'}</button>
      </div>

      {error && <div style={{color:'crimson', marginBottom:8}}>{error}</div>}

      {result && (
        <div>
          <div><strong>Short URL:</strong></div>
          <div style={{display:'flex', gap:8, alignItems:'center', marginTop:6}}>
            <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
            <button type="button" className="btn" onClick={() => handleCopy(result.shortUrl)}>Copy</button>
          </div>
          {result.expiresAt && <div className="url-meta">Expires at: {new Date(result.expiresAt).toLocaleString()}</div>}
        </div>
      )}
    </form>
  )
}
