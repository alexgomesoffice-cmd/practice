import type { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string[]
  }
}

export const metadata: Metadata = {
  title: 'Game Detail',
}

export default function Page({ params }: PageProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Game Detail</h1>
      <p className="mt-4">Slug: {params.slug.join(' / ')}</p>
    </div>
  )
}