export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-8 mt-16 border-t-4 border-manga-red">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-manga text-2xl tracking-wider mb-2">TO BE CONTINUED...</p>
        <p className="text-sm text-gray-400">Lunar Laugh Mission © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}