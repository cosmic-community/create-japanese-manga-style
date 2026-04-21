import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CharacterCard from '@/components/CharacterCard'
import ComicPageCard from '@/components/ComicPageCard'
import { getCharacters, getComicPages, getMetafieldValue } from '@/lib/cosmic'

export default async function HomePage() {
  const [characters, pages] = await Promise.all([
    getCharacters(),
    getComicPages(),
  ])

  const firstPage = pages[0]
  const coverImage = firstPage?.metadata?.page_artwork

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper py-20 border-b-4 border-manga-red">
        <div className="halftone-bg absolute inset-0 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="font-manga text-manga-red text-xl tracking-widest mb-3">PART 1</p>
            <h2 className="font-manga text-5xl md:text-7xl tracking-wider mb-4 leading-none">
              WE ARE<br />NOT READY
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Two teenagers sneak into a highly secured space launch site. What could possibly go wrong?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/read"
                className="bg-manga-red text-white px-6 py-3 font-manga text-xl tracking-wider manga-border shadow-panel hover:-translate-x-1 hover:-translate-y-1 transition-transform inline-block"
              >
                START READING →
              </Link>
              <Link
                href="/characters"
                className="bg-paper text-ink px-6 py-3 font-manga text-xl tracking-wider manga-border shadow-panel hover:-translate-x-1 hover:-translate-y-1 transition-transform inline-block"
              >
                MEET THE CREW
              </Link>
            </div>
          </div>
          {coverImage && (
            <div className="relative">
              <div className="manga-border shadow-panel bg-paper overflow-hidden transform rotate-2">
                <img
                  src={`${coverImage.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
                  alt="Cover"
                  width={400}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Characters */}
      {characters.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8 border-b-4 border-ink pb-4">
            <h2 className="font-manga text-4xl md:text-5xl tracking-wider">THE CREW</h2>
            <Link href="/characters" className="font-bold text-manga-red hover:underline">View All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        </section>
      )}

      {/* Pages */}
      {pages.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16 bg-white manga-border shadow-panel mb-16">
          <div className="flex items-end justify-between mb-8 border-b-4 border-ink pb-4">
            <h2 className="font-manga text-4xl md:text-5xl tracking-wider">THE CHAPTERS</h2>
            <Link href="/read" className="font-bold text-manga-red hover:underline">Read All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.slice(0, 6).map((page) => (
              <ComicPageCard key={page.id} page={page} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}