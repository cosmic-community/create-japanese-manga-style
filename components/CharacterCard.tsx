import Link from 'next/link'
import type { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CharacterCard({ character }: { character: Character }) {
  const image = character.metadata?.reference_image
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const role = getMetafieldValue(character.metadata?.role)
  const personality = getMetafieldValue(character.metadata?.personality)

  return (
    <Link href={`/characters/${character.slug}`} className="block group">
      <div className="bg-paper manga-border manga-shadow overflow-hidden transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0_0_#dc2626]">
        {image && (
          <div className="aspect-[3/4] overflow-hidden bg-gray-100 border-b-4 border-black">
            <img
              src={`${image.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
              alt={name}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-manga text-2xl tracking-wider mb-1">{name}</h3>
          {role && <p className="text-sm text-manga-red font-bold uppercase mb-2">{role}</p>}
          {personality && <p className="text-sm text-gray-700 line-clamp-3">{personality}</p>}
        </div>
      </div>
    </Link>
  )
}