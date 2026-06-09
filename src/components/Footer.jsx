import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'For Whom', href: '#who-for' },
  { label: 'Request Demo', href: '#demo-request' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-950 border-t border-gold-700/15">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="block text-2xl font-serif font-bold gold-text tracking-widest mb-2">
              SALA
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              South African Legal Intelligence. Bail and criminal precedent research tool for legal
              practitioners.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 items-start">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-gray-500 hover:text-gold-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-surface-700 pt-6 space-y-2">
          <p className="text-xs text-gray-600">
            SALA — South African Legal Intelligence
          </p>
          <p className="text-xs text-gray-700 leading-relaxed">
            Pilot system. Not legal advice. Users must verify authorities against the original source before reliance.
          </p>
        </div>
      </div>
    </footer>
  )
}
