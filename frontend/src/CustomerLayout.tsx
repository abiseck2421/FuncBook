import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import CustomerNavbar from './components/CustomerNavbar'
import CustomerSidebar from './components/CustomerSidebar'
import { WishlistProvider } from './contexts/WishlistContext'

export default function CustomerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userEmail] = useState('user@funcbook.com')
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <WishlistProvider>
      <div className="h-screen overflow-hidden bg-ivory">
        <CustomerNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <CustomerSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />

        <main className="w-full h-[calc(100vh-72px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </WishlistProvider>
  )
}
