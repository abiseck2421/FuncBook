import { useState } from 'react'
import LandingPage from './pages/LandingPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email)
    setIsAuthenticated(true)
  }

  return <LandingPage onAuthSuccess={handleAuthSuccess} isAuthenticated={isAuthenticated} userEmail={userEmail} />
}

export default App
