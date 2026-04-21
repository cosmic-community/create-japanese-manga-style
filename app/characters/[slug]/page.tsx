// app/characters/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCharacter, getMetafieldValue } from '@/lib/cosmic'

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const character = await getCharacter(slug)

  if (!character) {
    notFound()
  }

  const name = getMetafieldValue(character.metadata?.name) || character.title
  const role = getMetafieldValue(character.metadata?.role)
  const appearance = getMetafieldValue(character.metadata?.appearance)
  const personality = getMetafieldValue(character.metadata?.personality)
  const image = character.metadata?.reference_image

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/characters" className="inline-block mb-6 font-bold text-manga-red hover:underline">
          ← Back to Characters
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {image && (
            <div className="manga-border shadow-panel overflow-hidden bg-white">
              <img
                src={`${image.imgix_url}?w=1200&h=1600&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={800}
                className="w-full h-auto"
              />
            </div>
          )}
          <div>
            <h1 className="font-manga text-5xl md:text-6xl tracking-wider mb-2">{name}</h1>
            {role && <p className="text-manga-red font-bold text-xl uppercase mb-6">{role}</p>}

            {appearance && (
              <div className="mb-6">
                <h2 className="font-manga text-2xl tracking-wider mb-2 border-b-2 border-ink pb-1">APPEARANCE</h2>
                <p className="text-gray-800 leading-relaxed">{appearance}</p>
              </div>
            )}

            {personality && (
              <div className="mb-6">
                <h2 className="font-manga text-2xl tracking-wider mb-2 border-b-2 border-ink pb-1">PERSONALITY</h2>
                <p className="text-gray-800 leading-relaxed">{personality}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}