import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import LandingPage from './pages/CustomerPages/LandingPage'
import ServicesPage from './pages/CustomerPages/ServicesPage'
import CategoryPage from './pages/CustomerPages/CategoryPage'
import BookingPage from './pages/CustomerPages/BookingPage'
import CustomerBookingPage from './pages/CustomerPages/CustomerBookingPage'
import BecomeHostPage from './pages/HostPages/BecomeHostPage'
import AddServicePage from './pages/HostPages/AddServicePage'
import HostDashboardPage from './pages/HostPages/HostDashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<CategoryPage />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
          <Route path="/checkout/:serviceId" element={<CustomerBookingPage />} />
          <Route path="/become-host" element={<BecomeHostPage />} />
          <Route path="/host/dashboard" element={<HostDashboardPage />} />
          <Route path="/host/add-service" element={<AddServicePage />} />
          <Route path="/host/services" element={<HostDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
