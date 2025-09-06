export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const body = await req.json()
    const { companyId = 'NAYA', messages = [] } = body || {}
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'data', 'context', `${companyId}.txt`)
    let context = ''
    try {
      context = fs.readFileSync(filePath, 'utf8')
    } catch {
      context = 'No context found for this company.'
    }

    const system = `You are a biotech investor relations assistant. Answer ONLY using the CONTEXT below. If the answer is not present, reply exactly: "Not in this data room." Keep answers concise and factual.\n\nCONTEXT:\n${context}`

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        ...messages.map((m) => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.2
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify(payload)
    })
    if (!resp.ok) {
      const t = await resp.text()
      return NextResponse.json({ error: `OpenAI error: ${t}` }, { status: 500 })
    }
    const data = await resp.json()
    const reply = data?.choices?.[0]?.message?.content || 'Not in this data room.'
    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
