import { ThemeProvider } from "./context/ThemeContext";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import AITools from "./components/AITools";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      {/* Animated background (fixed behind everything) */}
      <AnimatedBackground />

      <CustomCursor />
      <Navbar />

      <main
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
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
  );
}

export default App;