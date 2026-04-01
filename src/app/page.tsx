import { redirect } from 'next/navigation'

/**
 * Root page — redirect to home editor.
 * In production render the published page instead.
 */
export default function Home() {
  redirect('/editor/home')
}
