import type { PuckProps } from '../config';

export function Hero({
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  backgroundImage,
  align,
}: PuckProps['Hero']) {
  return (
    <section
      className="relative flex min-h-[560px] items-center overflow-hidden bg-zinc-950 px-6 py-24"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-zinc-950/60" aria-hidden />
      )}
      <div
        className={`relative z-10 mx-auto max-w-4xl ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
          {heading}
        </h1>
        <p className="mt-6 text-xl leading-8 text-zinc-300">{subheading}</p>
        <div
          className={`mt-10 flex gap-4 flex-wrap ${
            align === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          <a
            href={ctaHref}
            className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-100"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
