import SidebarLayout from './SidebarLayout'
import CustomerLayout from './CustomerLayout'

export default function ServicesLayout() {
  const isAuthenticated = !!localStorage.getItem('funcbook_auth_user')

  if (isAuthenticated) {
    return <CustomerLayout />
  }

  return <SidebarLayout />
}
