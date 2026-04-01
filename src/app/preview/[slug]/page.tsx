import { Render } from '@puckeditor/core'
import { puckConfig } from '@/lib/puck.config'
import { defaultData } from '@/lib/default-data'
import type { Data } from '@puckeditor/core'
import { getPage } from '@/lib/storage'

type Props = { params: Promise<{ slug: string }> }

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params
  const data: Data = (await getPage(slug)) ?? defaultData

  return <Render config={puckConfig} data={data} />
}
