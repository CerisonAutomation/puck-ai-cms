import { Render } from '@measured/puck'
import '@measured/puck/puck.css'
import { puckConfig } from '@/lib/puck.config'
import { getPage } from '@/lib/storage'
import { defaultData } from '@/lib/default-data'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

/**
 * @page /preview/[slug]
 * @description Server-rendered Puck page with 60s ISR revalidation.
 */
export const revalidate = 60

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params
  const data = await getPage(slug)

  if (!data) notFound()

  return <Render config={puckConfig} data={data} />
}
