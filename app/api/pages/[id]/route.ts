import { NextRequest, NextResponse } from 'next/server';
import { upsertPage, setPublished } from '@/lib/supabase/pages';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const PutSchema = z.object({
  data: z.record(z.unknown()),
  title: z.string().min(1),
  published: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: encodedPath } = await params;
  const path = decodeURIComponent(encodedPath);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = PutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, title, published } = parsed.data;
  const page = await upsertPage(path, title, data);

  if (typeof published === 'boolean') {
    await setPublished(path, published);
  }

  return NextResponse.json(page);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: encodedPath } = await params;
  const path = decodeURIComponent(encodedPath);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabase.from('pages').delete().eq('path', path);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
