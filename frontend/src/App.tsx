import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import LandingPage from './pages/LandingPage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
