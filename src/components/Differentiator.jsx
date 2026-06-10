import { motion } from 'framer-motion'
import { trackDemoRequestClick } from '../lib/analytics'

const cards = [
  {
    n: '01',
    title: 'Issue-First Research',
    body: 'Start with the legal problem, not a keyword. SALA retrieves by issue, procedural context, and matter relevance.',
  },
  {
    n: '02',
    title: 'Supporting Reasoning',
    body: 'Surface the reasoning inside judgments — the passages that explain why an authority may assist your argument.',
  },
  {
    n: '03',
    title: 'Verification Layer',
    body: 'Verify sources before reliance. SALA checks authority references and links to the original judgment for every result.',
  },
  {
    n: '04',
    title: 'Preparation Workflow',
    body: 'Move from authority research into matter preparation. Notes, record analysis, and reports — in one workspace.',
  },
]

export default function Differentiator() {
  return (
    <section id="differentiator" className="section-padding bg-[#0a0a0e] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_60%,rgba(201,168,76,0.04)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Why SALA</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.05]">
              <span className="text-white">Not just search.</span>
              <br />
              <span className="gold-text">Litigation intelligence.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="text-base text-gray-500 leading-relaxed lg:pb-2"
          >
            SALA is designed to help practitioners move from legal issue to authority, reasoning,
            verification, and preparation output — without losing sight of the original source.
          </motion.p>
        </div>

        {/* 4 cards: 2×2 grid — minimal, architectural */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold-700/10">
          {cards.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[#0a0a0e] p-10 group transition-colors duration-300 hover:bg-gold-500/[0.025] cursor-default"
            >
              {/* Number + title row */}
              <div className="flex items-baseline gap-4 mb-5">
                <span className="text-[11px] font-mono text-gold-700 tracking-[0.3em] flex-shrink-0">
                  {c.n}
                </span>
                <div className="h-px flex-1 bg-gold-700/20 group-hover:bg-gold-600/35 transition-colors" />
              </div>

              <h3 className="text-xl font-serif font-bold text-white mb-3 leading-snug group-hover:text-gold-200/90 transition-colors duration-300">
                {c.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-start"
        >
          <a
            href="#demo-request"
            onClick={() => trackDemoRequestClick('differentiator')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-300 transition-colors group"
          >
            Request Demo
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
