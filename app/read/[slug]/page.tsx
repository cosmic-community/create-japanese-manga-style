// app/read/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getComicPage, getComicPages, getMetafieldValue } from '@/lib/cosmic'

export default async function ComicPageDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [page, allPages] = await Promise.all([
    getComicPage(slug),
    getComicPages(),
  ])

  if (!page) {
    notFound()
  }

  const currentIndex = allPages.findIndex((p) => p.slug === slug)
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null

  const pageNumber = page.metadata?.page_number || 0
  const pageTitle = getMetafieldValue(page.metadata?.page_title) || page.title
  const storyTitle = getMetafieldValue(page.metadata?.story_title)
  const sceneDescription = getMetafieldValue(page.metadata?.scene_description)
  const panels = getMetafieldValue(page.metadata?.panels)
  const artStyleNotes = getMetafieldValue(page.metadata?.art_style_notes)
  const artwork = page.metadata?.page_artwork
  const featuredChars = page.metadata?.featured_characters || []
  const isCliffhanger = page.metadata?.is_cliffhanger

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/read" className="inline-block mb-4 font-bold text-manga-red hover:underline">
          ← All Chapters
        </Link>

        <div className="bg-white manga-border shadow-panel p-6 md:p-8 mb-6">
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <span className="font-manga text-4xl md:text-5xl text-manga-red">PAGE {pageNumber}</span>
            {isCliffhanger && (
              <span className="bg-manga-red text-white px-3 py-1 font-manga text-sm tracking-wider border-2 border-black">
                CLIFFHANGER!
              </span>
            )}
          </div>
          <h1 className="font-manga text-3xl md:text-4xl tracking-wider mb-2">{pageTitle}</h1>
          {storyTitle && <p className="text-sm text-gray-600 italic">{storyTitle}</p>}
        </div>

        {artwork && (
          <div className="manga-border shadow-panel overflow-hidden bg-white mb-8">
            <img
              src={`${artwork.imgix_url}?w=1600&h=2000&fit=max&auto=format,compress`}
              alt={pageTitle}
              width={800}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        )}

        {sceneDescription && (
          <section className="mb-6 bg-white manga-border p-6">
            <h2 className="font-manga text-2xl tracking-wider mb-2 border-b-2 border-ink pb-1">SCENE</h2>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{sceneDescription}</p>
          </section>
        )}

        {panels && (
          <section className="mb-6 bg-white manga-border p-6">
            <h2 className="font-manga text-2xl tracking-wider mb-2 border-b-2 border-ink pb-1">PANELS</h2>
            <div className="text-gray-800 leading-relaxed whitespace-pre-line">{panels}</div>
          </section>
        )}

        {artStyleNotes && (
          <section className="mb-6 bg-ink text-paper manga-border p-6">
            <h2 className="font-manga text-2xl tracking-wider mb-2 border-b-2 border-manga-red pb-1">ART STYLE</h2>
            <p className="leading-relaxed whitespace-pre-line">{artStyleNotes}</p>
          </section>
        )}

        {featuredChars.length > 0 && (
          <section className="mb-6">
            <h2 className="font-manga text-2xl tracking-wider mb-3">FEATURED</h2>
            <div className="flex flex-wrap gap-3">
              {featuredChars.map((char) => {
                const charName = getMetafieldValue(char.metadata?.name) || char.title
                const charImg = char.metadata?.reference_image
                return (
                  <Link
                    key={char.id}
                    href={`/characters/${char.slug}`}
                    className="flex items-center gap-3 bg-white manga-border p-2 pr-4 hover:shadow-panel-sm transition-shadow"
                  >
                    {charImg && (
                      <img
                        src={`${charImg.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                        alt={charName}
                        width={60}
                        height={60}
                        className="w-12 h-12 object-cover border-2 border-black"
                      />
                    )}
                    <span className="font-bold">{charName}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Navigation */}
        <nav className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t-4 border-ink">
          {prevPage ? (
            <Link
              href={`/read/${prevPage.slug}`}
              className="bg-white manga-border shadow-panel-sm p-4 hover:-translate-x-1 hover:-translate-y-1 transition-transform"
            >
              <p className="text-xs text-gray-500 font-bold uppercase">← Previous</p>
              <p className="font-manga text-xl tracking-wider">
                Page {prevPage.metadata?.page_number || ''}
              </p>
            </Link>
          ) : (
            <div></div>
          )}
          {nextPage ? (
            <Link
              href={`/read/${nextPage.slug}`}
              className="bg-ink text-paper manga-border shadow-panel-sm p-4 text-right hover:-translate-x-1 hover:-translate-y-1 transition-transform"
            >
              <p className="text-xs text-gray-400 font-bold uppercase">Next →</p>
              <p className="font-manga text-xl tracking-wider">
                Page {nextPage.metadata?.page_number || ''}
              </p>
            </Link>
          ) : (
            <div className="bg-manga-red text-white manga-border shadow-panel-sm p-4 text-right">
              <p className="text-xs font-bold uppercase">The End</p>
              <p className="font-manga text-xl tracking-wider">To Be Continued...</p>
            </div>
          )}
        </nav>
      </main>
      <Footer />
    </div>
  )
}