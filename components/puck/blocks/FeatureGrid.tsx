import type { PuckProps } from '../config';

const colMap: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
};

export function FeatureGrid({ title, columns, features }: PuckProps['FeatureGrid']) {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="mb-14 text-center text-3xl font-bold text-zinc-900">
            {title}
          </h2>
        )}
        <div className={`grid gap-8 ${colMap[columns] ?? 'sm:grid-cols-3'}`}>
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 shadow-sm transition hover:shadow-md"
            >
              <p className="text-3xl">{f.icon}</p>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
