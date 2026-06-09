import { motion } from 'framer-motion'

export default function TrustNotice() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="relative py-8 bg-[#050507] border-y border-gold-700/12"
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-shrink-0 w-0.5 h-12 bg-gradient-to-b from-gold-400 to-gold-700 rounded hidden sm:block" />
        <div>
          <p className="text-sm font-semibold text-gold-400 mb-1">
            Controlled Pilot
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Currently in controlled pilot testing with selected legal users.{' '}
            <span className="text-gray-400">
              SALA assists legal research and preparation. Practitioners must verify original
              authorities before reliance or citation.
            </span>
          </p>
        </div>
      </div>
    </motion.section>
  )
}
