import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'In Action', href: '#in-action' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Why SALA', href: '#differentiator' },
  { label: 'Demo', href: '#demo-request' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-900/95 backdrop-blur-md border-b border-gold-700/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-serif font-bold gold-text tracking-widest">SALA</span>
          <span className="hidden sm:block text-xs text-gold-600 font-medium tracking-[0.2em] uppercase">
            Legal Intelligence
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-gold-400 transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo-request"
            className="text-sm font-semibold px-5 py-2 rounded border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black transition-all duration-200"
          >
            Request Demo
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gold-400 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gold-400 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gold-400 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-900/98 backdrop-blur-md border-b border-gold-700/20 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-400 hover:text-gold-400 transition-colors py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#demo-request"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold px-4 py-2 rounded border border-gold-500 text-gold-400 text-center mt-2"
              >
                Request Demo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
