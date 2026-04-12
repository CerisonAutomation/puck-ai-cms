'use client';

import { Puck } from '@puckeditor/core';
import { usePuckAI } from '@puckeditor/plugin-ai';
import HeadingAnalyzer from '@puckeditor/plugin-heading-analyzer';
import EmotionCachePlugin from '@puckeditor/plugin-emotion-cache';
import { config } from '@/components/puck/config';
import type { Data } from '@puckeditor/core';

type Props = {
  path: string;
  data: Data;
};

export function PuckEditor({ path, data }: Props) {
  const { ai } = usePuckAI({
    apiEndpoint: '/api/puck',
  });

  async function handlePublish(publishData: Data) {
    await fetch(`/api/pages/${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: publishData,
        title: (publishData.root?.props as Record<string,unknown>)?.title ?? path,
      }),
    });
  }

  return (
    <Puck
      config={config}
      data={data}
      onPublish={handlePublish}
      plugins={[EmotionCachePlugin(), HeadingAnalyzer()]}
      ai={ai}
      _experimentalVirtualization
    />
  );
}
