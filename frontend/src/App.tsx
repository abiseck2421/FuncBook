import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SidebarLayout from './SidebarLayout'
import CustomerLayout from './CustomerLayout'
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
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<CategoryPage />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
          <Route path="/checkout/:serviceId" element={<CustomerBookingPage />} />
          <Route path="/become-host" element={<BecomeHostPage />} />
        </Route>

        <Route element={<CustomerLayout type="host" />}>
          <Route path="/host/dashboard" element={<HostDashboardPage />} />
          <Route path="/host/add-service" element={<AddServicePage />} />
          <Route path="/host/services" element={<HostDashboardPage />} />
        </Route>

        <Route element={<CustomerLayout />}>
          <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
          <Route path="/customer/bookings" element={<MyBookingsPage />} />
          <Route path="/customer/wishlist" element={<WishlistPage />} />
          <Route path="/customer/reviews" element={<ReviewsPage />} />
          <Route path="/customer/payments" element={<PaymentsPage />} />
          <Route path="/customer/settings" element={<SettingsPage />} />
          <Route path="/customer/help" element={<HelpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
