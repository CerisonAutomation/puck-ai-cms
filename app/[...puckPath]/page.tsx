import { Render } from '@puckeditor/core/rsc';
import { config } from '@/components/puck/config';
import { getPageByPath } from '@/lib/supabase/pages';
import type { Data } from '@puckeditor/core';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ puckPath: string[] }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { puckPath } = await params;
  const path = '/' + puckPath.join('/');
  const page = await getPageByPath(path);
  return { title: page?.title ?? path };
}

export default async function PublicPage({ params }: Props) {
  const { puckPath } = await params;
  const path = '/' + puckPath.join('/');
  const page = await getPageByPath(path);
  if (!page || !page.published) notFound();
  return <Render config={config} data={page.data as Data} />;
}
