import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, Linkedin, Github, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { personal } from '../data'
import styles from './Contact.module.css'

// ── EmailJS credentials ───────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_p2c2g1l'
const EMAILJS_TEMPLATE_ID = 'template_tvp6rwk'
const EMAILJS_PUBLIC_KEY = 'AC2nEGDvuW-aPABm3'
// ─────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: personal.phone,
    href: `tel:${personal.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: `in/${personal.linkedinId}`,
    href: personal.linkedin,
  },
]

const socialLinks = [
  { icon: <Github size={18} />, href: personal.github, label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: personal.linkedin, label: 'LinkedIn' },
  { icon: <Twitter size={18} />, href: personal.twitter, label: 'X/Twitter' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: 'Sahil Bundela',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact">
      <div className="container">

        <FadeIn>
          <div className="section-label">Let's talk</div>
          <h2 className="section-title">
            Get In <span className="highlight">Touch</span>
          </h2>
          <p className="section-sub">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </FadeIn>

        <div className={styles.grid}>

          {/* ── Left: contact info ── */}
          <div className={styles.info}>

            <FadeIn delay={0.1}>
              <p className={styles.infoText}>
                I'm currently open to new opportunities — whether it's a full-time role,
                freelance project, or just a conversation about tech. Feel free to reach out!
              </p>
            </FadeIn>

            <div className={styles.links}>
              {contactLinks.map((l, i) => (
                <FadeIn key={l.label} delay={0.15 + i * 0.07}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`glass-card ${styles.contactLink}`}
                  >
                    <span className={styles.linkIcon}>{l.icon}</span>
                    <div>
                      <div className={styles.linkLabel}>{l.label}</div>
                      <div className={styles.linkValue}>{l.value}</div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className={styles.socialsRow}>
                {socialLinks.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={styles.socialBtn}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </FadeIn>

          </div>

          {/* ── Right: form ── */}
          <FadeIn delay={0.2} className={styles.formWrap}>
            <form className={`glass-card ${styles.form}`} onSubmit={onSubmit}>

              {/* Status banners */}
              {status === 'sent' && (
                <motion.div
                  className={`${styles.alert} ${styles.alertSuccess}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={18} />
                  Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className={`${styles.alert} ${styles.alertError}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={18} />
                  Something went wrong. Please try emailing me directly.
                </motion.div>
              )}

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className={styles.input}
                    placeholder="ABC"
                    required
                    disabled={status !== 'idle'}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={styles.input}
                    placeholder="abc1@example.com"
                    required
                    disabled={status !== 'idle'}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  className={styles.textarea}
                  placeholder="Tell me about your project or just say hello..."
                  required
                  rows={5}
                  disabled={status !== 'idle'}
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                disabled={status !== 'idle'}
                whileHover={status === 'idle' ? { y: -2 } : {}}
                whileTap={status === 'idle' ? { scale: 0.97 } : {}}
              >
                {status === 'idle' && <><Send size={16} /> Send Message</>}
                {status === 'sending' && <><span className={styles.spinner} /> Sending...</>}
                {status === 'sent' && <><CheckCircle size={16} /> Sent!</>}
                {status === 'error' && <><AlertCircle size={16} /> Failed — Try Again</>}
              </motion.button>

            </form>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}