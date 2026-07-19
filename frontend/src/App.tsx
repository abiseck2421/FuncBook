import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { WishlistProvider } from './contexts/WishlistContext'
import SidebarLayout from './SidebarLayout'
import CustomerLayout from './CustomerLayout'
import ServicesLayout from './ServicesLayout'
import LandingPage from './pages/CustomerPages/LandingPage'
import ServicesPage from './pages/CustomerPages/ServicesPage'
import CategoryPage from './pages/CustomerPages/CategoryPage'
import BookingPage from './pages/CustomerPages/BookingPage'
import CustomerBookingPage from './pages/CustomerPages/CustomerBookingPage'
import CustomerDashboardPage from './pages/CustomerPages/CustomerDashboardPage'
import MyBookingsPage from './pages/CustomerPages/MyBookingsPage'
import WishlistPage from './pages/CustomerPages/WishlistPage'
import ReviewsPage from './pages/CustomerPages/ReviewsPage'
import PaymentsPage from './pages/CustomerPages/PaymentsPage'
import SettingsPage from './pages/CustomerPages/SettingsPage'
import HelpPage from './pages/CustomerPages/HelpPage'
import BecomeHostPage from './pages/HostPages/BecomeHostPage'
import AddServicePage from './pages/HostPages/AddServicePage'
import HostDashboardPage from './pages/HostPages/HostDashboardPage'

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
          <Route path="/checkout/:serviceId" element={<CustomerBookingPage />} />
          <Route path="/become-host" element={<BecomeHostPage />} />
        </Route>

        <Route element={<ServicesLayout />}>
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<CategoryPage />} />
        </Route>

        <Route element={<CustomerLayout type="host" />}>
          <Route path="/host/dashboard" element={<HostDashboardPage />} />
          <Route path="/host/add-service" element={<AddServicePage />} />
          <Route path="/host/services" element={<HostDashboardPage />} />
        </Route>

        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CustomerDashboardPage />} />
          <Route path="bookings" element={<MyBookingsPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  )
}

export default App
