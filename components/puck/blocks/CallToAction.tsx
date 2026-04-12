import type { PuckProps } from '../config';

export function CallToAction({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant,
}: PuckProps['CallToAction']) {
  const isSplit = variant === 'split';
  return (
    <section className="bg-indigo-600 py-20 px-6">
      <div
        className={`mx-auto max-w-5xl flex flex-col gap-8 ${
          isSplit
            ? 'sm:flex-row sm:items-center sm:justify-between'
            : 'items-center text-center'
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold text-white">{heading}</h2>
          <p className="mt-3 text-indigo-100">{body}</p>
        </div>
        <div className="flex shrink-0 gap-4 flex-wrap">
          <a
            href={primaryHref}
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow hover:bg-indigo-50 transition"
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
