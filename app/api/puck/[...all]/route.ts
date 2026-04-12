import { createPuckAIHandler } from '@puckeditor/plugin-ai/server';
import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { config } from '@/components/puck/config';

const handler = createPuckAIHandler({
  config,
  openAiApiKey: process.env.OPENAI_API_KEY!,
  model: 'gpt-4o',
  systemPrompt: `You are a visual page builder AI. Generate Puck component trees based on user descriptions. Use real, meaningful content — never lorem ipsum. Keep layouts clean, modern, and conversion-focused.`,
});

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ all: string[] }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });
  return handler(req, ctx);
}

export const GET = handler;
