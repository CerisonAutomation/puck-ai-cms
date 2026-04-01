import type { Config } from '@puckeditor/core'

export type ComponentProps = {
  Hero: { title: string; subtitle: string; ctaText: string; ctaHref: string }
  Text: { content: string; size: 'sm' | 'base' | 'lg' }
  Image: { src: string; alt: string; caption: string }
  Card: { title: string; body: string; href: string }
  Columns: { leftContent: string; rightContent: string }
}

export const puckConfig: Config<ComponentProps> = {
  components: {
    Hero: {
      fields: {
        title: { type: 'text' },
        subtitle: { type: 'textarea' },
        ctaText: { type: 'text' },
        ctaHref: { type: 'text' },
      },
      defaultProps: {
        title: 'Welcome',
        subtitle: 'Your page subtitle goes here.',
        ctaText: 'Get started',
        ctaHref: '#',
      },
      render: ({ title, subtitle, ctaText, ctaHref }) => (
        <section className="flex flex-col items-center justify-center gap-6 py-24 px-8 text-center bg-gradient-to-b from-gray-50 to-white">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">{title}</h1>
          <p className="text-xl text-gray-500 max-w-xl">{subtitle}</p>
          <a
            href={ctaHref}
            className="rounded-lg bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            {ctaText}
          </a>
        </section>
      ),
    },
    Text: {
      fields: {
        content: { type: 'textarea' },
        size: {
          type: 'select',
          options: [
            { value: 'sm', label: 'Small' },
            { value: 'base', label: 'Base' },
            { value: 'lg', label: 'Large' },
          ],
        },
      },
      defaultProps: { content: 'Enter your text here.', size: 'base' },
      render: ({ content, size }) => {
        const cls = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        return (
          <div className={`max-w-3xl mx-auto px-8 py-6 ${cls} text-gray-700 leading-relaxed`}>
            {content}
          </div>
        )
      },
    },
    Image: {
      fields: {
        src: { type: 'text' },
        alt: { type: 'text' },
        caption: { type: 'text' },
      },
      defaultProps: { src: '', alt: '', caption: '' },
      render: ({ src, alt, caption }) => (
        <figure className="max-w-3xl mx-auto px-8 py-6">
          {src && <img src={src} alt={alt} className="w-full rounded-lg object-cover" loading="lazy" />}
          {caption && <figcaption className="mt-2 text-sm text-gray-400 text-center">{caption}</figcaption>}
        </figure>
      ),
    },
    Card: {
      fields: {
        title: { type: 'text' },
        body: { type: 'textarea' },
        href: { type: 'text' },
      },
      defaultProps: { title: 'Card Title', body: 'Card description.', href: '#' },
      render: ({ title, body, href }) => (
        <a
          href={href}
          className="block max-w-sm mx-auto m-4 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{body}</p>
        </a>
      ),
    },
    Columns: {
      fields: {
        leftContent: { type: 'textarea' },
        rightContent: { type: 'textarea' },
      },
      defaultProps: { leftContent: 'Left column text.', rightContent: 'Right column text.' },
      render: ({ leftContent, rightContent }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-8 py-8">
          <div className="text-gray-700">{leftContent}</div>
          <div className="text-gray-700">{rightContent}</div>
        </div>
      ),
    },
  },
}
