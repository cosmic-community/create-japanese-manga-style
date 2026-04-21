import { createBucketClient } from '@cosmicjs/sdk'
import type { Character, ComicPage } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export async function getCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Character[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacter(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'characters', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Character
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch character')
  }
}

export async function getComicPages(): Promise<ComicPage[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'comic-pages' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const pages = response.objects as ComicPage[]
    return pages.sort((a, b) => {
      const numA = a.metadata?.page_number || 0
      const numB = b.metadata?.page_number || 0
      return numA - numB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch comic pages')
  }
}

export async function getComicPage(slug: string): Promise<ComicPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'comic-pages', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as ComicPage
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch comic page')
  }
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}