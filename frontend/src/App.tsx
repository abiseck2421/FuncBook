import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import LandingPage from './pages/LandingPage'
import ServicesPage from './pages/ServicesPage'
import CategoryPage from './pages/CategoryPage'
import BookingPage from './pages/BookingPage'
import BecomeHostPage from './pages/BecomeHostPage'
import AddServicePage from './pages/AddServicePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<CategoryPage />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
          <Route path="/become-host" element={<BecomeHostPage />} />
          <Route path="/become-host/details" element={<AddServicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
