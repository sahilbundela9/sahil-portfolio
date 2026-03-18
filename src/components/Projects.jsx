import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Folder } from 'lucide-react'
import { projects } from '../data'
import styles from './Projects.module.css'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card ${styles.card} ${project.featured ? styles.featured : ''}`}
    >
      {project.featured && (
        <div className={styles.featuredBadge}>Featured</div>
      )}

      <div className={styles.cardTop}>
        <div className={styles.folderIcon}>
          <Folder size={26} />
        </div>
        <div className={styles.cardLinks}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={styles.iconLink}
            title="View on GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={styles.iconLink}
            title="Live Demo"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <h3 className={styles.cardName}>{project.name}</h3>
      <p className={styles.cardDesc}>{project.desc}</p>

      <div className={styles.stack}>
        {project.stack.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <FadeIn>
          <div className="section-label">What I've built</div>
          <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
          <p className="section-sub">
            A curated selection of projects from my GitHub — real code, real solutions.
          </p>
        </FadeIn>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className={styles.cta}>
            <p className={styles.ctaText}>Want to see more of my work?</p>
            <a
              href="https://github.com/sahilbundela9"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <Github size={16} />
              View All on GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
