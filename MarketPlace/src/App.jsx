import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 gap-6">
        <div className="relative">
          <img src={heroImg} className="w-40 mx-auto" alt="" />
          <img src={reactLogo} className="w-12 absolute -top-4 -left-6 animate-spin-slow" alt="React logo" />
          <img src={viteLogo} className="w-12 absolute -bottom-4 -right-6" alt="Vite logo" />
        </div>

        <div>
          <h1 className="text-5xl font-bold mb-4">Get started</h1>
          <p className="text-gray-400">
            Edit <code className="bg-gray-800 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition"
        >
          Count is {count}
        </button>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-10"></div>

      {/* Next Steps */}
      <section className="grid md:grid-cols-2 gap-10 max-w-4xl w-full px-6 pb-16">

        {/* Docs */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Documentation</h2>
          <p className="text-gray-400 mb-4">Your questions, answered</p>
          <ul className="space-y-3">
            <li>
              <a href="https://vite.dev/" target="_blank" className="flex items-center gap-2 hover:text-purple-400">
                <img className="w-6" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="flex items-center gap-2 hover:text-purple-400">
                <img className="w-6" src={reactLogo} alt="" />
                Learn React
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Connect</h2>
          <p className="text-gray-400 mb-4">Join the community</p>
          <ul className="space-y-3">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="hover:text-purple-400">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="hover:text-purple-400">
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="hover:text-purple-400">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

      </section>

    </div>
  )
}

export default App