export interface Category {
  id: string
  name: string
}

export interface Service {
  id: string
  name: string
  location: string
  rating: number
  reviewCount: number
  price: number
  image: string
  tags: string[]
  verified: boolean
  category: string
}

export const categories: Category[] = [
  { id: 'function-halls', name: 'Function Halls' },
  { id: 'catering', name: 'Catering' },
  { id: 'decoration', name: 'Decoration Setups' },
  { id: 'lighting-sound', name: 'Lighting & Sound' },
  { id: 'makeup', name: 'Makeup Artists' },
  { id: 'photographers', name: 'Photographers' },
  { id: 'chairs-furniture', name: 'Chairs & Furniture' },
  { id: 'event-planners', name: 'Event Planners' },
  { id: 'djs', name: 'DJs' },
  { id: 'flower-decorators', name: 'Flower Decorators' },
]

export const servicesByCategory: Record<string, Service[]> = {
  'function-halls': [
    { id: 'fh-1', name: 'The Grand Ballroom', location: 'Downtown, City Center', rating: 4.9, reviewCount: 128, price: 50000, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop', tags: ['AC', 'Parking', 'Stage'], verified: true, category: 'function-halls' },
    { id: 'fh-2', name: 'Royal Palm Convention', location: 'South Extension', rating: 4.8, reviewCount: 96, price: 35000, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop', tags: ['Garden', 'Poolside'], verified: true, category: 'function-halls' },
    { id: 'fh-3', name: 'Silver Oak Banquet', location: 'West Avenue', rating: 4.7, reviewCount: 84, price: 28000, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop', tags: ['AC', 'Catering'], verified: true, category: 'function-halls' },
    { id: 'fh-4', name: 'Crystal Palace Hall', location: 'North District', rating: 4.9, reviewCount: 152, price: 65000, image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=300&fit=crop', tags: ['Premium', 'Valet'], verified: true, category: 'function-halls' },
  ],
  catering: [
    { id: 'cat-1', name: 'Spice Symphony Catering', location: 'City Center', rating: 4.8, reviewCount: 215, price: 1200, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop', tags: ['Veg', 'Non-Veg'], verified: true, category: 'catering' },
    { id: 'cat-2', name: 'Royal Feast Caterers', location: 'South Side', rating: 4.7, reviewCount: 178, price: 1500, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop', tags: ['Multi-Cuisine'], verified: true, category: 'catering' },
    { id: 'cat-3', name: 'Sweet Beginnings', location: 'East End', rating: 4.6, reviewCount: 94, price: 800, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', tags: ['Desserts', 'Bakery'], verified: false, category: 'catering' },
    { id: 'cat-4', name: 'Grand Table Service', location: 'North District', rating: 4.7, reviewCount: 132, price: 1350, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', tags: ['Corporate', 'Buffet'], verified: true, category: 'catering' },
  ],
  decoration: [
    { id: 'dec-1', name: 'Elegance Decor Studio', location: 'City Center', rating: 4.9, reviewCount: 167, price: 25000, image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=300&fit=crop', tags: ['Floral', 'Traditional'], verified: true, category: 'decoration' },
    { id: 'dec-2', name: 'Modern Setups', location: 'West Side', rating: 4.7, reviewCount: 88, price: 18000, image: 'https://images.unsplash.com/photo-1478146059778-1ea5d3ccb4cf?w=400&h=300&fit=crop', tags: ['Modern', 'Minimal'], verified: true, category: 'decoration' },
    { id: 'dec-3', name: 'Heritage Decorators', location: 'Old Town', rating: 4.8, reviewCount: 142, price: 32000, image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop', tags: ['Heritage', 'Royal'], verified: true, category: 'decoration' },
    { id: 'dec-4', name: 'Bloom & Decor', location: 'North District', rating: 4.6, reviewCount: 73, price: 15000, image: 'https://images.unsplash.com/photo-1519379157579-e6c3459be4c4?w=400&h=300&fit=crop', tags: ['Floral', 'Eco'], verified: false, category: 'decoration' },
  ],
  'lighting-sound': [
    { id: 'ls-1', name: 'Starlight Productions', location: 'City Wide', rating: 4.8, reviewCount: 134, price: 22000, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop', tags: ['LED', 'Sound System'], verified: true, category: 'lighting-sound' },
    { id: 'ls-2', name: 'SoundWave Engineers', location: 'Industrial Area', rating: 4.7, reviewCount: 91, price: 18000, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop', tags: ['Premium Audio'], verified: true, category: 'lighting-sound' },
    { id: 'ls-3', name: 'Glow Lighting Co', location: 'South Extension', rating: 4.5, reviewCount: 67, price: 12000, image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=300&fit=crop', tags: ['Fairy Lights', 'Stage'], verified: false, category: 'lighting-sound' },
    { id: 'ls-4', name: 'Aurora Stage Works', location: 'Tech Park', rating: 4.6, reviewCount: 83, price: 19500, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop', tags: ['Projection', 'Live Sound'], verified: true, category: 'lighting-sound' },
  ],
  makeup: [
    { id: 'mk-1', name: 'Glam Studio by Priya', location: 'Beauty Plaza', rating: 4.9, reviewCount: 203, price: 8000, image: 'https://images.unsplash.com/photo-1487412949247-f83f1225f4b4?w=400&h=300&fit=crop', tags: ['Bridal', 'HD Makeup'], verified: true, category: 'makeup' },
    { id: 'mk-2', name: 'Artistry Makeovers', location: 'Mall Road', rating: 4.7, reviewCount: 156, price: 6000, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', tags: ['Party', 'Editorial'], verified: true, category: 'makeup' },
    { id: 'mk-3', name: 'Natural Glow Salon', location: 'East End', rating: 4.6, reviewCount: 112, price: 4500, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', tags: ['Organic', 'Airbrush'], verified: false, category: 'makeup' },
    { id: 'mk-4', name: 'Radiance Bridal Bar', location: 'Lake View', rating: 4.8, reviewCount: 139, price: 9200, image: 'https://images.unsplash.com/photo-1487412949247-f83f1225f4b4?w=400&h=300&fit=crop&sat=-10', tags: ['Bridal', 'Party'], verified: true, category: 'makeup' },
  ],
  photographers: [
    { id: 'ph-1', name: 'Captured Moments', location: 'Studio Lane', rating: 4.9, reviewCount: 241, price: 15000, image: 'https://images.unsplash.com/photo-1452587925148-f5447730fcb8?w=400&h=300&fit=crop', tags: ['Wedding', 'Candid'], verified: true, category: 'photographers' },
    { id: 'ph-2', name: 'Lens & Light Studio', location: 'Arts District', rating: 4.8, reviewCount: 189, price: 12000, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop', tags: ['Portrait', 'Event'], verified: true, category: 'photographers' },
    { id: 'ph-3', name: 'Flash Photography', location: 'City Center', rating: 4.6, reviewCount: 88, price: 8000, image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop', tags: ['Budget', 'Digital'], verified: false, category: 'photographers' },
    { id: 'ph-4', name: 'Golden Frame Studio', location: 'West End', rating: 4.7, reviewCount: 117, price: 13500, image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop', tags: ['Cinematic', 'Wedding'], verified: true, category: 'photographers' },
  ],
  'chairs-furniture': [
    { id: 'cf-1', name: 'Royal Chair Rentals', location: 'Furniture Market', rating: 4.7, reviewCount: 76, price: 250, image: 'https://images.unsplash.com/photo-1506439771522-85524d6245a6?w=400&h=300&fit=crop', tags: ['Premium', 'Velvet'], verified: true, category: 'chairs-furniture' },
    { id: 'cf-2', name: 'Elegant Seating Co', location: 'South Side', rating: 4.6, reviewCount: 63, price: 180, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop', tags: ['Classic', 'Modern'], verified: true, category: 'chairs-furniture' },
    { id: 'cf-3', name: 'Event Furniture Hub', location: 'Industrial Area', rating: 4.5, reviewCount: 54, price: 150, image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop', tags: ['Tables', 'Chairs'], verified: false, category: 'chairs-furniture' },
    { id: 'cf-4', name: 'Majestic Seating Rentals', location: 'Central Market', rating: 4.6, reviewCount: 71, price: 220, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop', tags: ['Banquet', 'Dining'], verified: true, category: 'chairs-furniture' },
  ],
  'event-planners': [
    { id: 'ep-1', name: 'Dream Weavers Events', location: 'Corporate Zone', rating: 4.9, reviewCount: 197, price: 40000, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', tags: ['Wedding', 'Corporate'], verified: true, category: 'event-planners' },
    { id: 'ep-2', name: 'Celebration Planners', location: 'City Center', rating: 4.8, reviewCount: 165, price: 30000, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop', tags: ['Birthday', 'Anniversary'], verified: true, category: 'event-planners' },
    { id: 'ep-3', name: 'Elite Event Management', location: 'West Avenue', rating: 4.7, reviewCount: 134, price: 55000, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop', tags: ['Luxury', 'Destination'], verified: true, category: 'event-planners' },
    { id: 'ep-4', name: 'Signature Moments Co', location: 'North Hub', rating: 4.8, reviewCount: 121, price: 45000, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop', tags: ['End-to-End', 'Theme'], verified: true, category: 'event-planners' },
  ],
  djs: [
    { id: 'dj-1', name: 'DJ Vortex', location: 'Entertainment Hub', rating: 4.8, reviewCount: 189, price: 12000, image: 'https://images.unsplash.com/photo-1571266028243-3716f02d0e77?w=400&h=300&fit=crop', tags: ['EDM', 'Bollywood'], verified: true, category: 'djs' },
    { id: 'dj-2', name: 'Beat Masters', location: 'Nightlife District', rating: 4.7, reviewCount: 156, price: 10000, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', tags: ['Pop', 'Remixes'], verified: true, category: 'djs' },
    { id: 'dj-3', name: 'Sound Safari DJs', location: 'City Wide', rating: 4.6, reviewCount: 98, price: 8000, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop', tags: ['Wedding', 'Party'], verified: false, category: 'djs' },
    { id: 'dj-4', name: 'Pulse Nation DJs', location: 'Skyline District', rating: 4.7, reviewCount: 123, price: 11000, image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop', tags: ['Club', 'Live Mix'], verified: true, category: 'djs' },
  ],
  'flower-decorators': [
    { id: 'fd-1', name: 'Petal Paradise', location: 'Flower Market', rating: 4.9, reviewCount: 178, price: 15000, image: 'https://images.unsplash.com/photo-1519379157579-e6c3459be4c4?w=400&h=300&fit=crop', tags: ['Fresh', 'Imported'], verified: true, category: 'flower-decorators' },
    { id: 'fd-2', name: 'Bloom Design Studio', location: 'Garden Road', rating: 4.8, reviewCount: 145, price: 12000, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop', tags: ['Bridal', 'Stage'], verified: true, category: 'flower-decorators' },
    { id: 'fd-3', name: 'Nature\'s Touch', location: 'Botanical Area', rating: 4.7, reviewCount: 102, price: 10000, image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=400&h=300&fit=crop', tags: ['Eco', 'Organic'], verified: false, category: 'flower-decorators' },
    { id: 'fd-4', name: 'Rose Garden Decor', location: 'South Extension', rating: 4.6, reviewCount: 87, price: 8000, image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=300&fit=crop', tags: ['Roses', 'Traditional'], verified: true, category: 'flower-decorators' },
  ],
}
