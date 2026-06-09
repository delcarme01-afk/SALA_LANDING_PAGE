import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustNotice from './components/TrustNotice'
import InAction from './components/InAction'
import Differentiator from './components/Differentiator'
import Workflow from './components/Workflow'
import Features from './components/Features'
import WhoFor from './components/WhoFor'
import TrustBuilt from './components/TrustBuilt'
import PilotForm from './components/PilotForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#050507] text-white min-h-screen font-sans">
      <Nav />
      <main>
        <Hero />
        <TrustNotice />
        <InAction />
        <Differentiator />
        <Workflow />
        <Features />
        <WhoFor />
        <TrustBuilt />
        <PilotForm />
      </main>
      <Footer />
    </div>
  )
}
