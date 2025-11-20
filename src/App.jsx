import PlacesList from './components/PlacesList'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-8">
        <header className="max-w-5xl mx-auto text-center md:text-left mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Germany Tourist Places</h1>
          <p className="text-blue-200 mt-2">Search and browse notable destinations across Germany.</p>
        </header>

        <PlacesList />

        <footer className="mt-12 text-center text-blue-300/60">Data is stored in a database so you can add and retrieve places.</footer>
      </div>
    </div>
  )
}

export default App
