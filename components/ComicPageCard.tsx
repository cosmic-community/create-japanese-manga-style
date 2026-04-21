import Link from 'next/link'
import type { ComicPage } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ComicPageCard({ page }: { page: ComicPage }) {
  const artwork = page.metadata?.page_artwork
  const pageNumber = page.metadata?.page_number || 0
  const pageTitle = getMetafieldValue(page.metadata?.page_title) || page.title
  const sceneDescription = getMetafieldValue(page.metadata?.scene_description)
  const isCliffhanger = page.metadata?.is_cliffhanger

  return (
    <Link href={`/read/${page.slug}`} className="block group">
      <div className="bg-paper manga-border manga-shadow overflow-hidden transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 relative">
        {isCliffhanger && (
          <div className="absolute top-2 right-2 z-10 bg-manga-red text-white px-3 py-1 font-manga text-sm tracking-wider border-2 border-black shadow-panel-sm">
            CLIFFHANGER!
          </div>
        )}
        {artwork && (
          <div className="aspect-[3/4] overflow-hidden bg-gray-100 border-b-4 border-black">
            <img
              src={`${artwork.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
              alt={pageTitle}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-manga text-3xl text-manga-red">#{pageNumber}</span>
            <h3 className="font-bold text-lg line-clamp-1">{pageTitle}</h3>
          </div>
          {sceneDescription && (
            <p className="text-sm text-gray-700 line-clamp-2">{sceneDescription}</p>
          )}
        </div>
      </div>
    </Link>
  )
}