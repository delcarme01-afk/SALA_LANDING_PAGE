import { motion } from 'framer-motion'

const pillars = [
  {
    n: '01',
    title: 'South African Judgments',
    body: 'Built on South African case law. Retrieval is tuned to the SA jurisdiction, court hierarchy, and procedural context — not a generic global index.',
  },
  {
    n: '02',
    title: 'Bail & Criminal Focus',
    body: 'Specific depth in bail, criminal law, and related areas. SALA is trained on the issues, thresholds, and legislative framework that matter most in practice.',
  },
  {
    n: '03',
    title: 'Authority Verification',
    body: 'Every result is subject to SALA Verify — checking source availability and authority integrity before a practitioner relies on or cites any result.',
  },
  {
    n: '04',
    title: 'Source Transparency',
    body: 'SALA links directly to original judgments. Practitioners are never asked to rely on a summary or extract alone.',
  },
  {
    n: '05',
    title: 'Matter Preparation Workflows',
    body: 'Designed around the matter lifecycle — from initial research to record analysis, authority selection, and structured preparation output.',
  },
]

export default function TrustBuilt() {
  return (
    <section id="trust" className="section-padding bg-[#0a0a0e] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(201,168,76,0.03)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Foundation</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.05]">
              Built for South African legal practice.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="text-base text-gray-500 leading-relaxed lg:pb-2"
          >
            Designed from the ground up for the South African jurisdiction, practitioner workflow,
            and professional standard of care.
          </motion.p>
        </div>

        {/* Pillars: 5-item horizontal rule list */}
        <div className="space-y-0 border-t border-gold-700/12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="group grid grid-cols-1 sm:grid-cols-[80px_1fr_2fr] gap-4 sm:gap-8 py-8 border-b border-gold-700/12 hover:bg-gold-500/[0.015] transition-colors px-2"
            >
              <span className="text-[11px] font-mono text-gold-700 tracking-[0.3em] pt-0.5">{p.n}</span>
              <h3 className="text-sm font-semibold text-white leading-snug">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
