import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'
import { useTyping } from '../hooks/useTyping'
import { personal } from '../data'
import styles from './Hero.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const orbs = [
  { size: 520, top: '-120px', right: '-100px', color: 'rgba(0,119,182,0.11)', delay: 0 },
  { size: 320, bottom: '40px', left: '-80px',  color: 'rgba(0,180,216,0.09)', delay: -3 },
  { size: 180, top: '40%',    right: '18%',    color: 'rgba(72,202,228,0.07)', delay: -5 },
]

export default function Hero() {
  const typed = useTyping(personal.taglines)

  return (
    <section className={styles.hero} id="hero">
      {/* Background orbs */}
      <div className={styles.orbWrap}>
        {orbs.map((o, i) => (
          <motion.div
            key={i}
            className={styles.orb}
            style={{
              width: o.size, height: o.size,
              top: o.top, right: o.right,
              bottom: o.bottom, left: o.left,
              background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            }}
            animate={{ y: [0, -28, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
          />
        ))}
      </div>

      {/* Floating shapes */}
      <motion.div
        className={`${styles.shape} ${styles.shape1}`}
        animate={{ rotate: [12, 28, 12], y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${styles.shape} ${styles.shape2}`}
        animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: -2 }}
      />
      <motion.div
        className={`${styles.shape} ${styles.shape3}`}
        animate={{ scaleX: [1, 1.5, 1], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: -4 }}
      />

      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <motion.div className={styles.badge} {...fadeUp(0)}>
          <span className={styles.badgeDot} />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1 className={styles.name} {...fadeUp(0.12)}>
          {personal.name.split(' ').map((word, i) => (
            <span key={i} className={styles.nameWord}>{word}</span>
          ))}
        </motion.h1>

        {/* Typed subtitle */}
        <motion.div className={styles.typed} {...fadeUp(0.24)}>
          <span className="mono">{typed}</span>
          <span className={styles.cursor} />
        </motion.div>

        {/* Description */}
        <motion.p className={styles.desc} {...fadeUp(0.36)}>
          {personal.summary}
        </motion.p>

        {/* CTAs */}
        <motion.div className={styles.btns} {...fadeUp(0.48)}>
          <a href="#projects" className="btn-primary">
            View Projects <ArrowDown size={15} />
          </a>
          <a href="#contact" className="btn-secondary">Contact Me →</a>
        </motion.div>

        {/* Social row */}
        <motion.div className={styles.socials} {...fadeUp(0.58)}>
          <a href={personal.github}   target="_blank" rel="noreferrer" className={styles.socialLink} aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={personal.twitter}  target="_blank" rel="noreferrer" className={styles.socialLink} aria-label="X / Twitter">
            <Twitter size={18} />
          </a>
          <div className={styles.socialDivider} />
          <span className={styles.socialHint}>@{personal.githubId}</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
