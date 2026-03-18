import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Mail, Phone, Linkedin, Github, GraduationCap, Globe } from 'lucide-react'
import { personal } from '../data'
import styles from './About.module.css'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const infoPills = [
  { icon: <GraduationCap size={20} />, label: 'Education',  value: personal.education },
  { icon: <MapPin size={20} />,        label: 'Location',   value: personal.location },
  { icon: <Mail size={20} />,          label: 'Email',      value: personal.email, href: `mailto:${personal.email}` },
  { icon: <Phone size={20} />,         label: 'Phone',      value: personal.phone, href: `tel:${personal.phone.replace(/\s/g,'')}` },
  { icon: <Github size={20} />,        label: 'GitHub',     value: `github.com/${personal.githubId}`, href: personal.github },
  { icon: <Linkedin size={20} />,      label: 'LinkedIn',   value: `in/${personal.linkedinId}`, href: personal.linkedin },
  { icon: <Globe size={20} />,         label: 'Languages',  value: personal.languages.join(' · ') },
]

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <FadeIn>
          <div className="section-label">Who I am</div>
          <h2 className="section-title">About <span className="highlight">Me</span></h2>
          <p className="section-sub">A developer who believes clean code and beautiful design go hand in hand.</p>
        </FadeIn>

        <div className={styles.grid}>
          {/* Left — cards */}
          <div className={styles.cards}>
            <FadeIn delay={0.1}>
              <div className={`glass-card ${styles.card}`}>
                <h3 className={styles.cardTitle}>Professional Summary</h3>
                <p className={styles.cardText}>{personal.summary}</p>
                <div className={styles.stats}>
                  {[
                    ['Stack',    'Java · Spring Boot · React'],
                    ['Status',   'Open to work 🚀'],
                    ['Focus',    'Full Stack Development'],
                  ].map(([k, v]) => (
                    <div key={k} className={styles.statRow}>
                      <span className={styles.statKey}>{k}</span>
                      <span className={styles.statVal}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className={`glass-card ${styles.card}`}>
                <h3 className={styles.cardTitle}>Career Objective</h3>
                <p className={styles.cardText}>{personal.objective}</p>
              </div>
            </FadeIn>
          </div>

          {/* Right — info pills */}
          <div className={styles.pillsCol}>
            {infoPills.map((p, i) => (
              <FadeIn key={p.label} delay={0.1 + i * 0.06}>
                {p.href ? (
                  <a href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`glass-card ${styles.pill}`}>
                    <span className={styles.pillIcon}>{p.icon}</span>
                    <div>
                      <div className={styles.pillLabel}>{p.label}</div>
                      <div className={styles.pillValue}>{p.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className={`glass-card ${styles.pill}`}>
                    <span className={styles.pillIcon}>{p.icon}</span>
                    <div>
                      <div className={styles.pillLabel}>{p.label}</div>
                      <div className={styles.pillValue}>{p.value}</div>
                    </div>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
