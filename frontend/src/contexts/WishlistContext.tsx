import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Service } from '../data/categories'

interface WishlistContextValue {
  wishlist: Service[]
  toggleWishlist: (service: Service) => void
  isWishlisted: (serviceId: string) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Service[]>([])

  const toggleWishlist = useCallback((service: Service) => {
    setWishlist((prev) => {
      const exists = prev.some((s) => s.id === service.id)
      if (exists) return prev.filter((s) => s.id !== service.id)
      return [...prev, service]
    })
  }, [])

  const isWishlisted = useCallback(
    (serviceId: string) => wishlist.some((s) => s.id === serviceId),
    [wishlist],
  )

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

const defaultWishlist: WishlistContextValue = {
  wishlist: [],
  toggleWishlist: () => {},
  isWishlisted: () => false,
}

export function useWishlist() {
  return useContext(WishlistContext) ?? defaultWishlist
}
