import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = [
  'Attorney',
  'Advocate',
  'Legal Researcher',
  'Law Clinic Practitioner',
  'Judicial Support',
  'Other',
]

const INITIAL = { name: '', email: '', role: '', organisation: '', areaOfLaw: '', message: '' }

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wide">
        {label}
        {required && <span className="text-gold-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full bg-[#0e0e16] border border-[#2a2a38] text-white text-sm rounded px-3 py-2.5 placeholder-gray-700 focus:outline-none focus:border-gold-600/70 focus:ring-1 focus:ring-gold-600/20 transition-colors duration-200'

export default function PilotForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true
    if (!form.role) e.role = true
    if (!form.organisation.trim()) e.organisation = true
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  return (
    <section id="demo-request" className="section-padding bg-[#050507] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="text-center mb-12"
        >
          <span className="section-label">Controlled Testing</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4 leading-[1.05]">
            Request a SALA Demo
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            SALA is currently in controlled testing. Submit your details if you would like to be considered for a future demo or early access.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-xl p-10 text-center gold-border-glow"
            >
              <div className="w-14 h-14 rounded-full border border-gold-500/30 bg-gold-700/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-3">Request Received</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Thank you. Your demo request has been recorded for follow-up.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card rounded-xl p-8 space-y-5 gold-border-glow"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set('name')}
                    className={`${inputCls} ${errors.name ? 'border-red-700' : ''}`}
                  />
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set('email')}
                    className={`${inputCls} ${errors.email ? 'border-red-700' : ''}`}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Role" required>
                  <select
                    value={form.role}
                    onChange={set('role')}
                    className={`${inputCls} ${errors.role ? 'border-red-700' : ''}`}
                  >
                    <option value="" disabled>Select role…</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Organisation" required>
                  <input
                    type="text"
                    placeholder="Firm / chambers / institution"
                    value={form.organisation}
                    onChange={set('organisation')}
                    className={`${inputCls} ${errors.organisation ? 'border-red-700' : ''}`}
                  />
                </Field>
              </div>

              <Field label="Area of Law">
                <input
                  type="text"
                  placeholder="e.g. Criminal, Bail, Labour, Commercial…"
                  value={form.areaOfLaw}
                  onChange={set('areaOfLaw')}
                  className={inputCls}
                />
              </Field>

              <Field label="Message">
                <textarea
                  placeholder="Tell us about your practice and how SALA might assist…"
                  value={form.message}
                  onChange={set('message')}
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {Object.keys(errors).length > 0 && (
                <p className="text-xs text-red-400">Please fill in all required fields correctly.</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded text-sm font-semibold text-black bg-gold-500 hover:bg-gold-400 active:scale-[0.99] transition-all duration-200 shadow-[0_8px_32px_rgba(201,168,76,0.25)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] mt-2 tracking-wide"
              >
                Submit Demo Request
              </button>

              <p className="text-[11px] text-gray-600 text-center leading-relaxed">
                Your details are used solely to assess pilot fit. No data is shared with third parties.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
