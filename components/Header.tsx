import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-ink text-paper border-b-4 border-paper">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="group">
          <h1 className="font-manga text-3xl md:text-4xl tracking-wider text-paper group-hover:text-manga-red transition-colors">
            🚀 LUNAR LAUGH MISSION
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Part 1: We Are NOT Ready</p>
        </Link>
        <nav className="flex gap-6 text-sm md:text-base font-bold uppercase tracking-wide">
          <Link href="/" className="hover:text-manga-red transition-colors">Home</Link>
          <Link href="/read" className="hover:text-manga-red transition-colors">Read</Link>
          <Link href="/characters" className="hover:text-manga-red transition-colors">Characters</Link>
        </nav>
      </div>
    </header>
  )
}