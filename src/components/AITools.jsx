import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { aiTools } from '../data'
import styles from './AITools.module.css'

function FadeIn({ children, delay = 0 }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    )
}

function AICard({ tool, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    return (
        <motion.div
            ref={ref}
            className={styles.card}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.22 } }}
        >
            {/* Glow blob behind card */}
            <div className={styles.glow} style={{ background: tool.color }} />

            <div className={styles.iconWrap}>
                <span className={styles.icon}>{tool.icon}</span>
            </div>

            <h3 className={styles.name}>{tool.name}</h3>
            <p className={styles.desc}>{tool.desc}</p>

            <div className={styles.badge} style={{ borderColor: tool.color + '55', color: tool.color }}>
                AI Tool
            </div>
        </motion.div>
    )
}

export default function AITools() {
    return (
        <section id="ai-tools">
            <div className="container">
                <FadeIn>
                    <div className="section-label">Artificial Intelligence</div>
                    <h2 className="section-title">AI Tools I <span className="highlight">Work With</span></h2>
                    <p className="section-sub">
                        Leveraging cutting-edge AI platforms to build smarter, faster, and more creative solutions.
                    </p>
                </FadeIn>

                <div className={styles.grid}>
                    {aiTools.map((tool, i) => (
                        <AICard key={tool.name} tool={tool} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}