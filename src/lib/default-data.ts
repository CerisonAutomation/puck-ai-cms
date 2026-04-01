import type { Data } from '@puckeditor/core'

export const defaultData: Data = {
  root: { props: {} },
  content: [
    {
      type: 'Hero',
      props: {
        id: 'hero-default',
        title: 'Christiano Property Management',
        subtitle: 'Premium property management services in Madrid and beyond.',
        ctaText: 'View properties',
        ctaHref: '/properties',
      },
    },
  ],
  zones: {},
}
