import { Navigate, Outlet } from 'react-router-dom'
import { useHostAuth } from '../contexts/hostAuth'

export default function RequireHostAuth() {
  const { isAuthenticated } = useHostAuth()

  if (!isAuthenticated) {
    return <Navigate to="/host/login" replace />
  }

  return <Outlet />
}
