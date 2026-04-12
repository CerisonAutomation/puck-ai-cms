import { getPageByPath } from '@/lib/supabase/pages';
import { PuckEditor } from './client';
import type { Data } from '@puckeditor/core';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

type Props = { params: Promise<{ puckPath: string[] }> };

export default async function EditorPage({ params }: Props) {
  const { puckPath } = await params;
  const path = '/' + puckPath.join('/');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${path}/edit`);

  const page = await getPageByPath(path);
  const initialData: Data = (page?.data as Data) ?? {
    content: [],
    root: { props: { title: path } },
  };

  return <PuckEditor path={path} data={initialData} />;
}
