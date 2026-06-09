import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// -----------------------------------------------------------------------------
// SCREENSHOTS
// Place real screenshot files in:  public/screenshots/<filename>
// Recommended: 1440x900px PNG or WebP
//
// Panels:
//   01 — authority-search.png   : SALA search results + authority cards
//   02 — supporting-reasoning.png : reasoning passages extracted from judgment
//   03 — sala-verify.png        : SALA Verify + Open Original Judgment panel
// -----------------------------------------------------------------------------

// -- Lightbox ------------------------------------------------------------------

function Lightbox({ src, alt, title, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  const clampZoom = useCallback((value) => Math.min(3, Math.max(1, Number(value.toFixed(2)))), [])
  const resetZoom = useCallback(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }, [])
  const zoomIn = useCallback(() => setZoom((z) => clampZoom(z + 0.25)), [clampZoom])
  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const next = clampZoom(z - 0.25)
      if (next === 1) setOffset({ x: 0, y: 0 })
      return next
    })
  }, [clampZoom])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const onWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? 0.18 : -0.18
    setZoom((z) => {
      const next = clampZoom(z + delta)
      if (next === 1) setOffset({ x: 0, y: 0 })
      return next
    })
  }

  const onPointerDown = (e) => {
    if (zoom <= 1) return
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragRef.current) return
    const start = dragRef.current
    setOffset({
      x: start.offsetX + e.clientX - start.x,
      y: start.offsetY + e.clientY - start.y,
    })
  }

  const onPointerUp = (e) => {
    dragRef.current = null
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8 cursor-zoom-out"
      style={{ background: 'rgba(3,3,6,0.94)', backdropFilter: 'blur(12px)' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.07)_0%,transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        <div
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative max-h-[76vh] overflow-hidden rounded-xl border border-gold-600/30 shadow-2xl shadow-black/80 bg-black/40 touch-none"
          style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
        >
          <img
            src={src}
            alt={alt}
            draggable="false"
            className="max-h-[76vh] w-full select-none object-contain transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
          <span className="text-sm text-gray-400 font-medium">{title}</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={zoomOut}
              className="rounded border border-gold-700/30 px-3 py-1.5 text-xs text-gold-500 hover:border-gold-500/60 hover:text-gold-300 transition-colors"
            >
              Zoom Out
            </button>
            <button
              type="button"
              onClick={zoomIn}
              className="rounded border border-gold-700/30 px-3 py-1.5 text-xs text-gold-500 hover:border-gold-500/60 hover:text-gold-300 transition-colors"
            >
              Zoom In
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="rounded border border-gold-700/30 px-3 py-1.5 text-xs text-gold-500 hover:border-gold-500/60 hover:text-gold-300 transition-colors"
            >
              Reset Zoom
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded border border-transparent px-2 py-1.5 text-xs text-gray-500 hover:text-gold-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
function ScreenshotPanel({ src, alt, title, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    // Outer wrapper carries the ambient glow via .screenshot-wrap CSS class
    <div className="screenshot-wrap">
      <motion.div
        className="relative aspect-[16/10] rounded-xl overflow-hidden cursor-zoom-in border border-gold-600/25 shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_34px_rgba(201,168,76,0.07)] transition-[border-color,box-shadow] duration-500 hover:border-gold-500/50 hover:shadow-[0_24px_80px_rgba(0,0,0,0.72),0_0_66px_rgba(201,168,76,0.13)]"
        whileHover={{ scale: 1.012 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
      >
        {/* Real screenshot — shown once loaded */}
        {!failed && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover block transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.035] ${
              loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
            }`}
          />
        )}

        {/* Placeholder — shown while loading or if image missing */}
        {(!loaded || failed) && (
          <div
            className="w-full bg-[#0c0c14] border-0"
            style={{ aspectRatio: '16/10' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-700/[0.03] via-transparent to-gold-600/[0.02]" />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-600/25 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-600/25 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-600/15 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-600/15 rounded-br-xl" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <svg className="w-7 h-7 text-gold-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p className="text-[10px] font-mono text-gold-800 tracking-widest uppercase">{title}</p>
            </div>
          </div>
        )}

        {/* Zoom hint — appears on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-sm rounded-md px-2.5 py-1.5">
            <svg className="w-3 h-3 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-[10px] text-gold-300 font-medium">Enlarge</span>
          </div>
        </div>

        {/* Hover overlay — very subtle darken */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/8 transition-colors duration-300 pointer-events-none" />
      </motion.div>
    </div>
  )
}

// -- Panel data ----------------------------------------------------------------

const panels = [
  {
    n: '01',
    id: 'authority-search',
    src: '/screenshots/authority-search.png',
    title: 'Authority Search',
    caption: 'Search authorities ranked by relevance and jurisdiction-specific weighting.',
    detail:
      'SALA surfaces South African authorities by legal issue, procedural context, and relevance — not just keyword frequency. Each result includes case characteristics, outcome, and a direct link to the original judgment.',
  },
  {
    n: '02',
    id: 'supporting-reasoning',
    src: '/screenshots/supporting-reasoning.png',
    title: 'Supporting Reasoning',
    caption: 'Surface the exact passages and reasoning that support your matter.',
    detail:
      'For each authority, SALA extracts the specific reasoning passages that may assist or challenge the legal argument — tied to the original judgment text, not paraphrased.',
  },
  {
    n: '03',
    id: 'sala-verify',
    src: '/screenshots/sala-verify.png',
    title: 'SALA Verify',
    caption: 'Verify authorities, references and source links before relying on them.',
    detail:
      'Before reliance or citation, SALA Verify checks that the authority is correctly identified, the source is accessible, and the original judgment can be opened — so practitioners are never relying on an unverified reference.',
  },
]

// -- Section -------------------------------------------------------------------

export default function InAction() {
  const [lightbox, setLightbox] = useState(null)
  const close = useCallback(() => setLightbox(null), [])

  return (
    <section id="in-action" className="section-padding bg-[#050507] relative overflow-hidden">
      {/* Section-level ambient radial */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(201,168,76,0.04)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 max-w-2xl"
        >
          <span className="section-label">Platform</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.05] mb-5">
            See SALA In Action
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg">
            From search to reasoning, verification and preparation reports.
          </p>
        </motion.div>

        {/* Alternating panels */}
        <div className="space-y-20 sm:space-y-28">
          {panels.map((p, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] gap-10 lg:gap-16 items-center"
              >
                {/* Text block — on mobile always above screenshot */}
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[11px] font-mono text-gold-700 tracking-[0.3em]">{p.n}</span>
                    <div className="h-px w-8 bg-gold-700/35" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-gold-400/80 font-serif text-base mb-4 leading-relaxed italic">
                    "{p.caption}"
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-7">{p.detail}</p>

                  {/* Per-panel inline CTA */}
                  <a
                    href="#demo-request"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-gold-600 hover:text-gold-400 transition-colors group"
                  >
                    Request Demo
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Screenshot panel — on mobile appears after text */}
                <div className={`group ${!isEven ? 'lg:order-1' : ''}`}>
                  <ScreenshotPanel
                    src={p.src}
                    alt={`SALA — ${p.title}`}
                    title={p.title}
                    onClick={() => setLightbox(p)}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Section CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 sm:mt-24 pt-10 border-t border-gold-700/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <p className="text-base font-serif text-white mb-1">Ready to see SALA?</p>
            <p className="text-sm text-gray-600">SALA is currently in controlled testing.</p>
          </div>
          <a href="#demo-request" className="btn-primary flex-shrink-0">
            Request Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={`SALA — ${lightbox.title}`}
            title={lightbox.title}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

