import { createClient } from './server';

export type Page = {
  id: string;
  path: string;
  title: string;
  data: Record<string, unknown>;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPageByPath(path: string): Promise<Page | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('path', path)
    .single();
  if (error) return null;
  return data as Page;
}

export async function getAllPages(): Promise<Page[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pages')
    .select('id, path, title, published, updated_at')
    .order('updated_at', { ascending: false });
  if (error) return [];
  return data as Page[];
}

export async function upsertPage(
  path: string,
  title: string,
  data: Record<string, unknown>
): Promise<Page> {
  const supabase = await createClient();
  const { data: page, error } = await supabase
    .from('pages')
    .upsert({ path, title, data }, { onConflict: 'path' })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return page as Page;
}

export async function setPublished(path: string, published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('pages')
    .update({ published })
    .eq('path', path);
  if (error) throw new Error(error.message);
}
