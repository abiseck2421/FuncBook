import { useNavigate } from 'react-router-dom'
import {
  Building2, UtensilsCrossed, Palette, Lightbulb, Camera,
  Sparkles, ArmchairIcon, CalendarCheck, Music, Flower2
} from 'lucide-react'

const categories = [
  { name: 'Function Halls', icon: Building2, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop' },
  { name: 'Catering', icon: UtensilsCrossed, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop' },
  { name: 'Decoration Setups', icon: Palette, image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=300&fit=crop' },
  { name: 'Lighting & Sound', icon: Lightbulb, image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop' },
  { name: 'Makeup Artists', icon: Sparkles, image: 'https://images.unsplash.com/photo-1487412949247-f83f1225f4b4?w=400&h=300&fit=crop' },
  { name: 'Photographers', icon: Camera, image: 'https://images.unsplash.com/photo-1452587925148-f5447730fcb8?w=400&h=300&fit=crop' },
  { name: 'Chairs & Furniture', icon: ArmchairIcon, image: 'https://images.unsplash.com/photo-1506439771522-85524d6245a6?w=400&h=300&fit=crop' },
  { name: 'Event Planners', icon: CalendarCheck, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop' },
  { name: 'DJs', icon: Music, image: 'https://images.unsplash.com/photo-1571266028243-3716f02d0e77?w=400&h=300&fit=crop' },
  { name: 'Flower Decorators', icon: Flower2, image: 'https://images.unsplash.com/photo-1519379157579-e6c3459be4c4?w=400&h=300&fit=crop' },
]

export default function BrowseCategories() {
  const navigate = useNavigate()
  return (
    <section id="categories" className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-4">
          Browse Categories
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-royal">
          Everything You Need
        </h2>
        <p className="mt-4 text-secondary-text max-w-md mx-auto">
          Explore premium event services curated for your perfect celebration
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 sm:gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.name}
              onClick={() => navigate('/services')}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] text-left w-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal/60 via-royal/10 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:bg-gold-deep group-hover:text-white transition-colors duration-300">
                  <Icon size={16} />
                </div>
                <h3 className="text-sm font-bold text-white">{cat.name}</h3>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
