import type { Data } from '@measured/puck'

/**
 * @file default-data.ts
 * Seed data shown the first time a new page slug is opened in the editor.
 */
export const defaultData: Data = {
  content: [
    {
      type: 'Hero',
      props: {
        id: 'hero-default',
        title: 'Welcome to Puck AI CMS',
        subtitle: 'Drag and drop your page into shape. Powered by @measured/puck + Vercel KV.',
        ctaText: 'Open Editor',
        ctaHref: '/editor/home',
        theme: 'light',
      },
    },
    {
      type: 'Text',
      props: {
        id: 'text-default',
        content: 'This is a live preview. Go to /editor/home to start editing.',
        size: 'base',
        align: 'center',
      },
    },
  ],
  root: { props: {} },
  zones: {},
}
