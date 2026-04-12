import type { PuckProps } from '../config';

export function RichText({ content }: PuckProps['RichText']) {
  if (!content) return null;
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div
        className="prose prose-zinc prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
