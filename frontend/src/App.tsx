import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    window.history.replaceState({ view: 'landing' }, '', window.location.pathname + window.location.search)

    const handlePopState = (event: PopStateEvent) => {
      setIsAuthenticated(event.state?.view === 'dashboard')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleAuthSuccess = () => {
    window.history.pushState({ view: 'dashboard' }, '', window.location.pathname + window.location.search)
    setIsAuthenticated(true)
  }

  if (isAuthenticated) {
    return <DashboardPage />
  }

  return <LandingPage onAuthSuccess={handleAuthSuccess} />
}

export default App
