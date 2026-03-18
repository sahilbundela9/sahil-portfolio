import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills, proficiency } from '../data'
import styles from './Skills.module.css'

const CATS = [
  { key: 'all', label: 'All' },
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'database', label: 'Database' },
  { key: 'tools', label: 'Tools' },
]

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function ProgressBar({ name, pct }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} className={styles.progRow}>
      <div className={styles.progHeader}>
        <span className={styles.progName}>{name}</span>
        <span className={styles.progPct}>{pct}%</span>
      </div>
      <div className={styles.progTrack}>
        <motion.div
          className={styles.progFill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </div>
  )
}

// Deterministic heatmap: seeded random so it doesn't re-render randomly
function generateHeatmap() {
  const cells = []
  // simple LCG seeded
  let seed = 42
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff }
  for (let i = 0; i < 365; i++) {
    const r = rand()
    const level = r < 0.52 ? 0 : r < 0.70 ? 1 : r < 0.83 ? 2 : r < 0.93 ? 3 : 4
    cells.push(level)
  }
  return cells
}
const HEATMAP = generateHeatmap()

export default function Skills() {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? skills : skills.filter(s => s.cat === cat)

  return (
    <section id="skills">
      <div className="container">
        <FadeIn>
          <div className="section-label">Tech arsenal</div>
          <h2 className="section-title">Technical <span className="highlight">Skills</span></h2>
          <p className="section-sub">The stack I reach for when building production-ready applications.</p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div className={styles.tabs}>
            {CATS.map(c => (
              <button
                key={c.key}
                className={`${styles.tab} ${cat === c.key ? styles.tabActive : ''}`}
                onClick={() => setCat(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skill cards */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s.name}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <SkillCard skill={s} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Progress bars */}
        <FadeIn delay={0.15}>
          <div className={styles.progressSection}>
            <h3 className={styles.progTitle}>Core Proficiency</h3>
            {proficiency.map(p => (
              <ProgressBar key={p.name} {...p} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function SkillCard({ skill }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <div ref={ref} className={`glass-card ${styles.skillCard}`}>
      <div className={styles.skillIcon}>{skill.icon}</div>
      <div className={styles.skillName}>{skill.name}</div>
      <div className={styles.skillBarWrap}>
        <motion.div
          className={styles.skillBar}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      </div>
    </div>
  )
}
