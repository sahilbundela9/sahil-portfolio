import { useEffect, useRef } from 'react'
import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let scrollY = 0
        let ticking = false

        const handleScroll = () => {
            scrollY = window.scrollY
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax(scrollY)
                    ticking = false
                })
                ticking = true
            }
        }

        const updateParallax = (sy) => {
            const elements = container.querySelectorAll('[data-speed]')
            elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed'))
                const rotate = parseFloat(el.getAttribute('data-rotate') || 0)
                const y = sy * speed
                const r = sy * rotate * 0.01
                el.style.transform = `translateY(${y}px) rotate(${r}deg)`
            })

            // Grid lines fade on scroll
            const grid = container.querySelector(`.${styles.grid}`)
            if (grid) {
                grid.style.opacity = Math.max(0.03, 0.07 - sy * 0.00008)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div ref={containerRef} className={styles.bg} aria-hidden="true">

            {/* ── Dot grid ── */}
            <div className={styles.dotGrid} />

            {/* ── Subtle line grid ── */}
            <div className={styles.grid} />

            {/* ── Large ambient orbs (slow parallax) ── */}
            <div className={styles.orb1} data-speed="-0.18" />
            <div className={styles.orb2} data-speed="0.12" />
            <div className={styles.orb3} data-speed="-0.08" />
            <div className={styles.orb4} data-speed="0.22" />
            <div className={styles.orb5} data-speed="-0.15" />

            {/* ── Floating geometric shapes ── */}
            <div className={`${styles.shape} ${styles.ring1}`} data-speed="-0.25" data-rotate="1" />
            <div className={`${styles.shape} ${styles.ring2}`} data-speed="0.18" data-rotate="-1" />
            <div className={`${styles.shape} ${styles.ring3}`} data-speed="-0.32" data-rotate="2" />
            <div className={`${styles.shape} ${styles.sq1}`} data-speed="0.28" data-rotate="3" />
            <div className={`${styles.shape} ${styles.sq2}`} data-speed="-0.2" data-rotate="-2" />
            <div className={`${styles.shape} ${styles.sq3}`} data-speed="0.35" data-rotate="4" />
            <div className={`${styles.shape} ${styles.tri1}`} data-speed="-0.14" data-rotate="1" />
            <div className={`${styles.shape} ${styles.tri2}`} data-speed="0.26" data-rotate="-3" />
            <div className={`${styles.shape} ${styles.cross1}`} data-speed="-0.3" data-rotate="2" />
            <div className={`${styles.shape} ${styles.cross2}`} data-speed="0.16" data-rotate="-1" />
            <div className={`${styles.shape} ${styles.dot1}`} data-speed="0.38" />
            <div className={`${styles.shape} ${styles.dot2}`} data-speed="-0.22" />
            <div className={`${styles.shape} ${styles.dot3}`} data-speed="0.19" />
            <div className={`${styles.shape} ${styles.dot4}`} data-speed="-0.28" />

            {/* ── Diagonal scan lines ── */}
            <div className={styles.scanLine1} data-speed="-0.06" />
            <div className={styles.scanLine2} data-speed="0.09" />

            {/* ── Corner accents ── */}
            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />

            {/* ── Horizontal glow bars ── */}
            <div className={styles.glowBar1} data-speed="-0.1" />
            <div className={styles.glowBar2} data-speed="0.14" />

        </div>
    )
}