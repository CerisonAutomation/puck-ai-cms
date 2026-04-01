import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Puck AI CMS</h1>
      <p className="text-gray-500 text-center max-w-md">
        Visual drag-and-drop page builder with AI component generation.
      </p>
      <div className="flex gap-4">
        <Link
          href="/editor/home"
          className="rounded-lg bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Open Editor
        </Link>
        <Link
          href="/preview/home"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Preview Page
        </Link>
      </div>
    </main>
  )
}
