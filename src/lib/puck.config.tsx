import type { Config } from '@measured/puck'

/**
 * @file puck.config.tsx
 * @description Central Puck component registry for the CMS.
 * Import this on both the editor and preview/render sides.
 */

export type ComponentProps = {
  Hero: { title: string; subtitle: string; ctaText: string; ctaHref: string; theme: 'light' | 'dark' }
  Text: { content: string; size: 'sm' | 'base' | 'lg'; align: 'left' | 'center' | 'right' }
  Image: { src: string; alt: string; caption: string; rounded: boolean }
  Card: { title: string; body: string; href: string }
  Columns: { leftContent: string; rightContent: string }
  Spacer: { size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }
  Divider: { style: 'solid' | 'dashed' | 'dotted' }
  CallToAction: { heading: string; body: string; buttonLabel: string; buttonHref: string }
}

export const puckConfig: Config<ComponentProps> = {
  components: {
    Hero: {
      label: 'Hero',
      fields: {
        title: { type: 'text', label: 'Heading' },
        subtitle: { type: 'textarea', label: 'Subtitle' },
        ctaText: { type: 'text', label: 'CTA Label' },
        ctaHref: { type: 'text', label: 'CTA URL' },
        theme: {
          type: 'radio',
          label: 'Theme',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      },
      defaultProps: {
        title: 'Build pages visually',
        subtitle: 'Drag, drop, and publish. No code required.',
        ctaText: 'Get started',
        ctaHref: '#',
        theme: 'light',
      },
      render: ({ title, subtitle, ctaText, ctaHref, theme }) => {
        const isDark = theme === 'dark'
        return (
          <section
            style={{
              padding: 'clamp(4rem, 10vw, 8rem) 2rem',
              textAlign: 'center',
              background: isDark
                ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              color: isDark ? '#f1f5f9' : '#0f172a',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: isDark ? '#94a3b8' : '#475569',
                maxWidth: '48ch',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
            <a
              href={ctaHref}
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                background: isDark ? '#38bdf8' : '#0f172a',
                color: isDark ? '#0f172a' : '#fff',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'opacity 0.18s',
              }}
            >
              {ctaText}
            </a>
          </section>
        )
      },
    },

    Text: {
      label: 'Text Block',
      fields: {
        content: { type: 'textarea', label: 'Content' },
        size: {
          type: 'select',
          label: 'Font Size',
          options: [
            { value: 'sm', label: 'Small' },
            { value: 'base', label: 'Base' },
            { value: 'lg', label: 'Large' },
          ],
        },
        align: {
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: { content: 'Your content here.', size: 'base', align: 'left' },
      render: ({ content, size, align }) => {
        const fontSize = size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem'
        return (
          <div
            style={{
              maxWidth: '72ch',
              margin: '0 auto',
              padding: '1.5rem 2rem',
              fontSize,
              textAlign: align,
              color: '#374151',
              lineHeight: 1.75,
            }}
          >
            {content}
          </div>
        )
      },
    },

    Image: {
      label: 'Image',
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        caption: { type: 'text', label: 'Caption' },
        rounded: { type: 'radio', label: 'Rounded', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: { src: '', alt: '', caption: '', rounded: true },
      render: ({ src, alt, caption, rounded }) => (
        <figure style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem 2rem' }}>
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', borderRadius: rounded ? '0.75rem' : '0', objectFit: 'cover' }}
            />
          )}
          {caption && (
            <figcaption style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center' }}>
              {caption}
            </figcaption>
          )}
        </figure>
      ),
    },

    Card: {
      label: 'Card',
      fields: {
        title: { type: 'text', label: 'Title' },
        body: { type: 'textarea', label: 'Body' },
        href: { type: 'text', label: 'Link URL' },
      },
      defaultProps: { title: 'Card Title', body: 'Card description goes here.', href: '#' },
      render: ({ title, body, href }) => (
        <a
          href={href}
          style={{
            display: 'block',
            maxWidth: '360px',
            margin: '1rem auto',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            textDecoration: 'none',
            transition: 'box-shadow 0.18s',
          }}
        >
          <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>{title}</h3>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>{body}</p>
        </a>
      ),
    },

    Columns: {
      label: '2-Column Layout',
      fields: {
        leftContent: { type: 'textarea', label: 'Left Column' },
        rightContent: { type: 'textarea', label: 'Right Column' },
      },
      defaultProps: { leftContent: 'Left column text.', rightContent: 'Right column text.' },
      render: ({ leftContent, rightContent }) => (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '2rem',
          }}
        >
          <div style={{ color: '#374151', lineHeight: 1.7 }}>{leftContent}</div>
          <div style={{ color: '#374151', lineHeight: 1.7 }}>{rightContent}</div>
        </div>
      ),
    },

    Spacer: {
      label: 'Spacer',
      fields: {
        size: {
          type: 'radio',
          label: 'Height',
          options: [
            { label: 'XS (0.5rem)', value: 'xs' },
            { label: 'SM (1rem)', value: 'sm' },
            { label: 'MD (2rem)', value: 'md' },
            { label: 'LG (4rem)', value: 'lg' },
            { label: 'XL (8rem)', value: 'xl' },
          ],
        },
      },
      defaultProps: { size: 'md' },
      render: ({ size }) => {
        const h = { xs: '0.5rem', sm: '1rem', md: '2rem', lg: '4rem', xl: '8rem' }[size]
        return <div style={{ height: h }} aria-hidden="true" />
      },
    },

    Divider: {
      label: 'Divider',
      fields: {
        style: {
          type: 'radio',
          label: 'Line Style',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Dotted', value: 'dotted' },
          ],
        },
      },
      defaultProps: { style: 'solid' },
      render: ({ style }) => (
        <hr
          style={{
            border: 'none',
            borderTop: `1px ${style} #e5e7eb`,
            margin: '2rem auto',
            maxWidth: '800px',
          }}
        />
      ),
    },

    CallToAction: {
      label: 'Call to Action',
      fields: {
        heading: { type: 'text', label: 'Heading' },
        body: { type: 'textarea', label: 'Body Text' },
        buttonLabel: { type: 'text', label: 'Button Label' },
        buttonHref: { type: 'text', label: 'Button URL' },
      },
      defaultProps: {
        heading: 'Ready to get started?',
        body: 'Join thousands of teams building with Puck.',
        buttonLabel: 'Start for free',
        buttonHref: '#',
      },
      render: ({ heading, body, buttonLabel, buttonHref }) => (
        <section
          style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '1rem',
            padding: 'clamp(2rem, 6vw, 4rem) 2rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '2rem auto',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#0c4a6e', marginBottom: '0.75rem' }}>
            {heading}
          </h2>
          <p style={{ color: '#0369a1', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>{body}</p>
          <a
            href={buttonHref}
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              background: '#0284c7',
              color: '#fff',
              borderRadius: '0.5rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {buttonLabel}
          </a>
        </section>
      ),
    },
  },
}
