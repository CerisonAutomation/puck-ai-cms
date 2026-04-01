'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Puck } from '@measured/puck'
import '@measured/puck/puck.css'
import { puckConfig } from '@/lib/puck.config'
import { defaultData } from '@/lib/default-data'
import type { Data } from '@measured/puck'

/**
 * @page /editor/[slug]
 * @description Full Puck visual editor with Vercel KV persistence and AI generation.
 * TODO: Add authentication middleware before public deployment.
 */
export default function EditorPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug ?? 'home'

  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const puckRef = useRef<{ dispatch: (action: unknown) => void } | null>(null)

  // Load saved page data
  useEffect(() => {
    setLoading(true)
    fetch(`/api/pages/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setData((json?.data as Data) ?? defaultData))
      .catch(() => setData(defaultData))
      .finally(() => setLoading(false))
  }, [slug])

  // Persist on publish
  const handlePublish = useCallback(
    async (newData: Data) => {
      setStatus('Saving…')
      try {
        const res = await fetch(`/api/pages/${encodeURIComponent(slug)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newData }),
        })
        setStatus(res.ok ? '✓ Saved' : '✗ Save failed')
      } catch {
        setStatus('✗ Network error')
      } finally {
        setTimeout(() => setStatus(null), 3000)
      }
    },
    [slug]
  )

  // AI page generation
  const handleAiGenerate = useCallback(async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, slug }),
      })
      if (!res.ok) throw new Error('AI failed')
      const { content } = await res.json()
      setData((prev) => ({
        ...(prev ?? defaultData),
        content,
      }))
      setAiPrompt('')
    } catch (err) {
      alert(`AI error: ${err instanceof Error ? err.message : 'Unknown'}`)
    } finally {
      setAiLoading(false)
    }
  }, [aiPrompt, slug])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#6b7280', fontFamily: 'system-ui, sans-serif' }}>
        Loading editor…
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* AI toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#0f172a',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>✦ AI</span>
        <input
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
          placeholder="Describe the page you want to generate…"
          style={{
            flex: 1,
            padding: '0.4rem 0.75rem',
            borderRadius: '0.375rem',
            border: '1px solid #334155',
            background: '#1e293b',
            color: '#f1f5f9',
            fontSize: '0.875rem',
          }}
        />
        <button
          onClick={handleAiGenerate}
          disabled={aiLoading || !aiPrompt.trim()}
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '0.375rem',
            background: aiLoading ? '#334155' : '#38bdf8',
            color: '#0f172a',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: 'none',
            cursor: aiLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {aiLoading ? '…' : 'Generate'}
        </button>
        {status && (
          <span style={{ color: status.startsWith('✓') ? '#4ade80' : '#f87171', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
            {status}
          </span>
        )}
        <span style={{ marginLeft: 'auto', color: '#475569', fontSize: '0.75rem' }}>/{slug}</span>
      </div>

      {/* Puck editor */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Puck
          ref={puckRef as never}
          config={puckConfig}
          data={data ?? defaultData}
          onPublish={handlePublish}
        />
      </div>
    </div>
  )
}
