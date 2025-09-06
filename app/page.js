'use client'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const [companyId, setCompanyId] = useState('NAYA')
  const [companyName, setCompanyName] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can answer questions using this company\'s data room. Ask about MoA, clinical plan, risks, or market.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cid = params.get('companyId') || 'NAYA'
    setCompanyId(cid)
    setCompanyName(params.get('companyName') || '')
  }, [])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'No reply' }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Error calling API.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div style={{width:10, height:10, borderRadius:999, background:'#22c55e'}} />
          <h1>{companyName || 'Company GPT'}</h1>
          <span>Company ID: {companyId}</span>
        </div>
        <div className="chat" ref={chatRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'assistant'}`}>{m.content}</div>
          ))}
          {loading && <div className="msg assistant">Thinking…</div>}
        </div>
        <div className="inputRow">
          <input
            type="text"
            placeholder="Ask about MoA, clinical plan, risks, comps…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send() }}
          />
          <button className="primary" onClick={send}>Send</button>
        </div>
        <div className="note">Answers are restricted to uploaded context. If out of scope, it will say so.</div>
      </div>
    </div>
  )
}
