import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Packages from './components/Packages'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Legal from './components/Legal'

// Politicile legale se deschid prin ancora din adresa (linkuri simple, merg si cu „Înapoi”)
const LEGAL_DOCS = { '#politica-cookies': 'cookies', '#confidentialitate': 'privacy' }
const legalFromHash = () => LEGAL_DOCS[window.location.hash] || null

export default function App() {
  const [legalDoc, setLegalDoc] = useState(legalFromHash)
  const [cookieSettings, setCookieSettings] = useState(false)

  useEffect(() => {
    const onHashChange = () => setLegalDoc(legalFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const closeLegal = useCallback(() => {
    // scoate ancora din adresa fara sa deruleze pagina
    if (legalFromHash()) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    setLegalDoc(null)
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Packages />
        <Portfolio />
        <Contact />
      </main>
      <Footer onCookieSettings={() => setCookieSettings(true)} />
      <CookieBanner open={cookieSettings} onClose={() => setCookieSettings(false)} />
      <Legal doc={legalDoc} onClose={closeLegal} />
    </>
  )
}
