import type { Service } from './categories'

const STORAGE_KEY = 'funcbook_host_services'

// Map AddServicePage category IDs to data file category IDs
const categoryIdMap: Record<string, string> = {
  'function-hall': 'function-halls',
  'catering': 'catering',
  'decoration': 'decoration',
  'lighting-sound': 'lighting-sound',
  'makeup': 'makeup',
  'photographer': 'photographers',
  'chairs-rentals': 'chairs-furniture',
  'other': 'event-planners',
}

export function mapCategoryId(hostCategoryId: string): string {
  return categoryIdMap[hostCategoryId] || hostCategoryId
}

export function saveHostService(service: Service): void {
  const existing = getHostServices()
  const updated = [...existing, service]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function deleteHostService(serviceId: string): void {
  const existing = getHostServices()
  const updated = existing.filter(s => s.id !== serviceId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getHostServices(): Service[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Service[]
  } catch {
    return []
  }
}

export function mergeServices(base: Record<string, Service[]>): Record<string, Service[]> {
  const hostServices = getHostServices()
  if (hostServices.length === 0) return base

  const merged = { ...base }
  for (const service of hostServices) {
    const catId = service.categoryId || 'event-planners'
    if (!merged[catId]) merged[catId] = []
    merged[catId] = [...merged[catId], service]
  }
  return merged
}
