import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'  // ← Naya
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="bg-[#0a0a1a] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        
             {/* ← Naya section */}
        <Experience />
        <Projects />
         <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home