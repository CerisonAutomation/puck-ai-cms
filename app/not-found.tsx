export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-zinc-400">This page hasn&apos;t been published yet.</p>
      <a href="/" className="mt-4 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-100">
        Go home
      </a>
    </main>
  );
}
