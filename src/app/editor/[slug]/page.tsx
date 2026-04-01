'use client'

import { useEffect, useState, useCallback } from 'react'
import { Puck, type Data } from '@puckeditor/core'
import { puckConfig } from '@/lib/puck.config'
import { defaultData } from '@/lib/default-data'

type Props = { params: Promise<{ slug: string }> }

export default function EditorPage({ params }: Props) {
  const [slug, setSlug] = useState<string | null>(null)
  const [data, setData] = useState<Data>(defaultData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug))
  }, [params])

  const fetchData = useCallback(async () => {
    if (!slug) return
    try {
      const res = await fetch(`/api/pages/${slug}`, { credentials: 'include' })
      if (res.ok) {
        const json = (await res.json()) as Data
        setData(json)
      }
    } catch {
      // use defaultData on network error
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handlePublish = async (newData: Data) => {
    if (!slug) return
    await fetch(`/api/pages/${slug}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
  }

  if (loading || !slug) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-400 text-sm animate-pulse">Loading editor…</div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <Puck config={puckConfig} data={data} onPublish={handlePublish} />
    </div>
  )
}
