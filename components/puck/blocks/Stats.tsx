import type { PuckProps } from '../config';

const bg: Record<string, string> = {
  white: 'bg-white text-zinc-900',
  dark: 'bg-zinc-950 text-white',
  brand: 'bg-indigo-600 text-white',
};

export function Stats({ stats, background }: PuckProps['Stats']) {
  return (
    <section className={`py-16 px-6 ${bg[background] ?? bg.brand}`}>
      <div className="mx-auto max-w-5xl">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <dt className="text-4xl font-extrabold">{s.value}</dt>
              <dd className="mt-2 text-sm font-medium opacity-80">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
