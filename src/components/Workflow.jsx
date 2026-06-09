import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    label: 'Upload Matter',
    detail:
      'Describe the legal issue or upload a court record, case document, or brief. SALA accepts text queries and PDF records.',
  },
  {
    n: '02',
    label: 'Extract Legal Issues',
    detail:
      'SALA extracts the key legal issues from your matter or uploaded record — the issues that need to be addressed and researched.',
  },
  {
    n: '03',
    label: 'Find Relevant Authorities',
    detail:
      'Ranked South African authorities are matched to each legal issue by relevance, procedural context, and matter weight.',
  },
  {
    n: '04',
    label: 'Extract Supporting Reasoning',
    detail:
      'For each authority, SALA surfaces the specific reasoning passages that may support or inform the legal argument.',
  },
  {
    n: '05',
    label: 'Verify Sources',
    detail:
      'Before reliance, SALA Verify checks authority references, confirms source availability, and links to the original judgment.',
  },
  {
    n: '06',
    label: 'Generate Preparation Output',
    detail:
      'A structured preparation report is generated from selected authorities and matter notes — ready for use in the matter.',
  },
]

export default function Workflow() {
  return (
    <section id="workflow" className="section-padding bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(201,168,76,0.03)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-2xl"
        >
          <span className="section-label">Process</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.05] mb-6">
            The SALA Workflow
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            From legal issue to verified authority, reasoning, and structured preparation output.
          </p>
        </motion.div>

        {/* Desktop: two-column numbered list */}
        <div className="hidden lg:grid grid-cols-2 gap-px bg-gold-700/8">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="group flex gap-6 p-8 hover:bg-gold-500/[0.02] transition-colors"
            >
              {/* Step number with connecting rule */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
                <div className="w-9 h-9 rounded-full border border-gold-700/30 flex items-center justify-center group-hover:border-gold-500/50 transition-colors">
                  <span className="text-[10px] font-mono text-gold-600 tracking-wide">{s.n}</span>
                </div>
                {i < steps.length - 2 && (
                  <div className="w-px flex-1 min-h-[20px] bg-gradient-to-b from-gold-700/25 to-transparent" />
                )}
              </div>
              <div className="pt-1.5">
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">{s.label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex gap-5 relative"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-4 top-10 w-px h-full bg-gradient-to-b from-gold-700/25 to-transparent" />
              )}
              <div className="flex-shrink-0 w-8 h-8 mt-1 rounded-full border border-gold-700/30 flex items-center justify-center z-10 bg-[#050507]">
                <span className="text-[9px] text-gold-600 font-mono">{s.n}</span>
              </div>
              <div className="pb-10">
                <h3 className="text-sm font-semibold text-white mb-1.5">{s.label}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
