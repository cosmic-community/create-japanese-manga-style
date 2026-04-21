import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ComicPageCard from '@/components/ComicPageCard'
import { getComicPages } from '@/lib/cosmic'

export default async function ReadPage() {
  const pages = await getComicPages()

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="font-manga text-5xl md:text-6xl tracking-wider mb-4">CHAPTERS</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Read the full manga adventure page by page
          </p>
        </div>

        {pages.length === 0 ? (
          <p className="text-center text-gray-500">No pages published yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => (
              <ComicPageCard key={page.id} page={page} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}