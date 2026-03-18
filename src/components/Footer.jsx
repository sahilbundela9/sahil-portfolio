import { Github, Linkedin, Twitter, Heart } from 'lucide-react'
import { personal } from '../data'
import styles from './Footer.module.css'

const navLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey',  href: '#journey'  },
  { label: 'Contact',  href: '#contact'  },
]

const socialLinks = [
  { icon: <Github size={16} />,   href: personal.github,   label: 'GitHub'  },
  { icon: <Linkedin size={16} />, href: personal.linkedin, label: 'LinkedIn'},
  { icon: <Twitter size={16} />,  href: personal.twitter,  label: 'Twitter' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Top row */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>SB.</a>
            <p className={styles.tagline}>
              Full Stack Java Developer · Surat, India
            </p>
          </div>

          <nav className={styles.nav}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className={styles.navLink}>{l.label}</a>
            ))}
          </nav>

          <div className={styles.socials}>
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
        </div>

        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {year} Sahil Bundela. All rights reserved.
          </span>
          <span className={styles.made}>
            Made with <Heart size={13} className={styles.heart} /> in Surat, India
          </span>
          <a href={`mailto:${personal.email}`} className={styles.emailLink}>
            {personal.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
