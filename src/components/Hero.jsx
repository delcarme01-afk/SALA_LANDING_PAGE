import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050507]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_65%_35%,rgba(201,168,76,0.06)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_5%_85%,rgba(201,168,76,0.03)_0%,transparent_60%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left: copy */}
        <div className="max-w-2xl">

          {/* Brand mark */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
            <span className="text-2xl font-serif font-bold gold-text tracking-[0.18em]">SALA</span>
            <span className="w-px h-4 bg-gold-700/40" />
            <span className="text-[10px] font-semibold tracking-[0.4em] text-gold-600 uppercase">
              South African Legal Intelligence
            </span>
          </motion.div>

          {/* Display headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif font-bold leading-[1.05] mb-8"
          >
            <span className="block text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] gold-text">
              Litigation Intelligence
            </span>
            <span className="block text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] text-white">
              for South African
            </span>
            <span className="block text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] text-white">
              Legal Practice
            </span>
          </motion.h1>

          {/* Gold rule */}
          <motion.div {...fadeUp(0.18)}>
            <div className="w-12 h-px bg-gradient-to-r from-gold-500 to-transparent mb-8" />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.26)}
            className="text-lg sm:text-xl font-serif text-gray-300 mb-5 leading-relaxed"
          >
            Find the best authorities. Extract the exact reasoning. Verify before you rely.
          </motion.p>

          {/* Body */}
          <motion.p
            {...fadeUp(0.36)}
            className="text-sm text-gray-500 mb-10 leading-relaxed max-w-lg"
          >
            SALA helps legal practitioners move from legal issue to authority, reasoning,
            verification and preparation output — without losing sight of the original source.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.46)} className="flex flex-wrap gap-4">
            <a href="#demo-request" className="btn-primary">
              Request Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#in-action" className="btn-secondary">
              See SALA In Action
            </a>
          </motion.div>
        </div>

        {/* Right: 3D canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="relative h-[420px] sm:h-[500px] lg:h-[560px] w-full"
        >
          <Suspense fallback={<div className="w-full h-full" />}>
            <HeroCanvas />
          </Suspense>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,#050507_100%)]" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] tracking-[0.4em] text-gold-700 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-gold-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}
