import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CharacterCard from '@/components/CharacterCard'
import { getCharacters } from '@/lib/cosmic'

export default async function CharactersPage() {
  const characters = await getCharacters()

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="font-manga text-5xl md:text-6xl tracking-wider mb-4">THE CREW</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Meet the heroes (and disasters) of our lunar adventure
          </p>
        </div>

        {characters.length === 0 ? (
          <p className="text-center text-gray-500">No characters found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}