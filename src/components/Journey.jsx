import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Code2, Zap, Rocket } from 'lucide-react'
import { journey } from '../data'
import styles from './Journey.module.css'

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

const typeIcons = {
  education: <GraduationCap size={18} />,
  dev:       <Code2 size={18} />,
  milestone: <Rocket size={18} />,
}

const typeColors = {
  education: 'var(--turquoise-surf)',
  dev:       'var(--sky-aqua)',
  milestone: 'var(--frosted-blue)',
}

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`${styles.item} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Dot on the center line */}
      <motion.div
        className={styles.dot}
        style={{ background: typeColors[item.type] }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25, type: 'spring', stiffness: 260 }}
      >
        <span className={styles.dotIcon} style={{ color: typeColors[item.type] }}>
          {typeIcons[item.type]}
        </span>
      </motion.div>

      <div className={`glass-card ${styles.card}`}>
        <div className={styles.period}>{item.period}</div>
        <h3 className={styles.title}>{item.title}</h3>
        <div className={styles.org} style={{ color: typeColors[item.type] }}>{item.org}</div>
        <p className={styles.desc}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  return (
    <section id="journey">
      <div className="container">
        <FadeIn>
          <div className="section-label">How I got here</div>
          <h2 className="section-title">Learning <span className="highlight">Journey</span></h2>
          <p className="section-sub">
            The milestones and experiences that shaped who I am as a developer.
          </p>
        </FadeIn>

        <div className={styles.timeline}>
          {/* Center line */}
          <div className={styles.line} />

          {journey.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Bottom — current status card */}
        <FadeIn delay={0.2}>
          <div className={`glass-card ${styles.statusCard}`}>
            <div className={styles.statusDot} />
            <div>
              <div className={styles.statusLabel}>Current Status</div>
              <div className={styles.statusText}>
                Actively building projects, learning new technologies, and open to exciting opportunities in Full Stack Development.
              </div>
            </div>
            <Zap size={22} className={styles.statusIcon} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
