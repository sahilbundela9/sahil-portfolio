import { ThemeProvider } from './context/ThemeContext'
import AnimatedBackground from './components/Animatedbackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import AITools from './components/AITools'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      {/* Fixed animated background — sits behind everything */}
      <AnimatedBackground />

      <CustomCursor />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <AITools />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Journey />
        <div className="divider" />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  )
}