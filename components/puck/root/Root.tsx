import type { DefaultRootRenderProps } from '@puckeditor/core';

type RootProps = DefaultRootRenderProps & { title?: string };

export function Root({ children }: RootProps) {
  return <main className="min-h-screen">{children}</main>;
}
