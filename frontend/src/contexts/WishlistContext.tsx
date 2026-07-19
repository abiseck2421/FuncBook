import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import type { Service } from '../data/categories'

export interface Collection {
  id: string
  name: string
  icon: string
  services: Service[]
}

interface WishlistContextValue {
  collections: Collection[]
  addToCollection: (service: Service, collectionId: string) => boolean
  removeFromCollection: (serviceId: string, collectionId: string) => void
  moveService: (serviceId: string, fromCollectionId: string, toCollectionId: string) => boolean
  createCollection: (name: string, icon?: string, service?: Service) => Collection
  isWishlisted: (serviceId: string) => boolean
  getCollectionsForService: (serviceId: string) => Collection[]
  totalSaved: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = 'funcbook_wishlist'

const DEFAULT_COLLECTIONS: Collection[] = [
  { id: 'col-favorites', name: 'Favorites', icon: '\u2764\uFE0F', services: [] },
]

let nextId = 1

function loadCollections(): Collection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // corrupt data, fall through
  }
  return DEFAULT_COLLECTIONS
}

function persistCollections(collections: Collection[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
  } catch {
    // storage full or unavailable
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>(loadCollections)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    persistCollections(collections)
  }, [collections])

  const addToCollection = useCallback((service: Service, collectionId: string): boolean => {
    const alreadyIn = collections.some(
      (col) => col.id === collectionId && col.services.some((s) => s.id === service.id),
    )
    if (alreadyIn) return false

    setCollections((prev) =>
      prev.map((col) => {
        if (col.id !== collectionId) return col
        return { ...col, services: [...col.services, service] }
      }),
    )
    return true
  }, [collections])

  const removeFromCollection = useCallback((serviceId: string, collectionId: string) => {
    setCollections((prev) => {
      const updated = prev.map((col) => {
        if (col.id !== collectionId) return col
        return { ...col, services: col.services.filter((s) => s.id !== serviceId) }
      })
      return updated.filter((col) => col.id === 'col-favorites' || col.services.length > 0)
    })
  }, [])

  const moveService = useCallback((serviceId: string, fromCollectionId: string, toCollectionId: string): boolean => {
    const alreadyInTarget = collections.some(
      (col) => col.id === toCollectionId && col.services.some((s) => s.id === serviceId),
    )
    if (alreadyInTarget) return false

    const hasInSource = collections.some(
      (col) => col.id === fromCollectionId && col.services.some((s) => s.id === serviceId),
    )
    if (!hasInSource) return false

    setCollections((prev) => {
      const service = prev
        .find((c) => c.id === fromCollectionId)
        ?.services.find((s) => s.id === serviceId)
      if (!service) return prev
      const updated = prev.map((col) => {
        if (col.id === fromCollectionId) {
          return { ...col, services: col.services.filter((s) => s.id !== serviceId) }
        }
        if (col.id === toCollectionId) {
          return { ...col, services: [...col.services, service] }
        }
        return col
      })
      return updated.filter((col) => col.id === 'col-favorites' || col.services.length > 0)
    })
    return true
  }, [collections])

  const createCollection = useCallback(
    (name: string, icon = '\u2764\uFE0F', service?: Service): Collection => {
      const newCol: Collection = {
        id: `col-${Date.now()}-${nextId++}`,
        name,
        icon,
        services: service ? [service] : [],
      }
      setCollections((prev) => [...prev, newCol])
      return newCol
    },
    [],
  )

  const isWishlisted = useCallback(
    (serviceId: string) => collections.some((col) => col.services.some((s) => s.id === serviceId)),
    [collections],
  )

  const getCollectionsForService = useCallback(
    (serviceId: string) => collections.filter((col) => col.services.some((s) => s.id === serviceId)),
    [collections],
  )

  const totalSaved = collections.reduce((sum, col) => sum + col.services.length, 0)

  return (
    <WishlistContext.Provider
      value={{
        collections,
        addToCollection,
        removeFromCollection,
        moveService,
        createCollection,
        isWishlisted,
        getCollectionsForService,
        totalSaved,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const defaultWishlist: WishlistContextValue = {
  collections: [],
  addToCollection: () => false,
  removeFromCollection: () => {},
  moveService: () => false,
  createCollection: () => ({ id: '', name: '', icon: '', services: [] }),
  isWishlisted: () => false,
  getCollectionsForService: () => [],
  totalSaved: 0,
}

export function useWishlist() {
  return useContext(WishlistContext) ?? defaultWishlist
}
