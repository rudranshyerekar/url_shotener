import React, { useState, useEffect } from 'react'
import ShortenForm from './components/ShortenForm'
import HistoryList from './components/HistoryList'

export default function App() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('short_history') || '[]')
    setHistory(stored)
  }, [])

  function addToHistory(item) {
    const next = [item, ...history].slice(0, 50)
    setHistory(next)
    localStorage.setItem('short_history', JSON.stringify(next))
  }

  return (
    <div className="container">
      <div className="header">
        <h1>URL Shortener</h1>
        <div className="small">Frontend (Vite) • Backend: Spring Boot</div>
      </div>

      <div className="card">
        <ShortenForm onSuccess={addToHistory} />
      </div>

      <div className="card">
        <h3>Recent</h3>
        <div className="history-list">
          <HistoryList items={history} />
        </div>
      </div>
    </div>
  )
}
