import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Building2, UtensilsCrossed,
  Palette, Camera, Music, Armchair, Package, MapPin, Phone,
  IndianRupee, Briefcase, FileText, AlertCircle, Plus, X, Upload,
  Save, Send, CalendarDays, Clock, Image, ChevronDown, Star, Trash2,
} from 'lucide-react'
import { saveHostService, mapCategoryId } from '../../data/hostServices'
import type { Service } from '../../data/categories'

// ─── Category definitions ──────────────────────────────────────────────────────

type CategoryId = 'function-hall' | 'catering' | 'decoration' | 'lighting-sound' | 'makeup' | 'photographer' | 'chairs-rentals' | 'other'

interface CategoryDef {
  id: CategoryId
  title: string
  desc: string
  icon: typeof Building2
  iconBg: string
  iconColor: string
}

const categories: CategoryDef[] = [
  { id: 'function-hall', title: 'Function Hall', desc: 'Rent out your venue for events.', icon: Building2, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { id: 'catering', title: 'Catering', desc: 'Food & beverage services.', icon: UtensilsCrossed, iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
  { id: 'decoration', title: 'Decoration', desc: 'Stage, floral & venue decor.', icon: Palette, iconBg: 'bg-rose-50', iconColor: 'text-rose-600' },
  { id: 'lighting-sound', title: 'Lighting & Sound', desc: 'Audio, lighting & DJ services.', icon: Music, iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { id: 'makeup', title: 'Makeup Artist', desc: 'Bridal & event makeup.', icon: Sparkles, iconBg: 'bg-pink-50', iconColor: 'text-pink-600' },
  { id: 'photographer', title: 'Photographer', desc: 'Photo & video coverage.', icon: Camera, iconBg: 'bg-sky-50', iconColor: 'text-sky-600' },
  { id: 'chairs-rentals', title: 'Chairs & Rentals', desc: 'Furniture & event rentals.', icon: Armchair, iconBg: 'bg-stone-50', iconColor: 'text-stone-600' },
  { id: 'other', title: 'Other Services', desc: 'Any other event service.', icon: Package, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
]

// ─── Category-specific field configs ───────────────────────────────────────────

type FieldDef = { key: string; label: string; type: 'text' | 'number' | 'select' | 'multiselect' | 'toggle' | 'textarea'; placeholder?: string; options?: string[]; required?: boolean }

const categoryFields: Record<CategoryId, FieldDef[]> = {
  'function-hall': [
    { key: 'hallType', label: 'Hall Type', type: 'select', options: ['Banquet Hall', 'Marriage Garden', 'Rooftop', 'Community Hall', 'Resort', 'Farmhouse', 'Other'], required: true },
    { key: 'maxCapacity', label: 'Maximum Guest Capacity', type: 'number', placeholder: 'e.g., 500', required: true },
    { key: 'seatingCapacity', label: 'Seating Capacity', type: 'number', placeholder: 'e.g., 400' },
    { key: 'diningCapacity', label: 'Dining Capacity', type: 'number', placeholder: 'e.g., 300' },
    { key: 'acAvailable', label: 'AC / Non-AC', type: 'select', options: ['AC', 'Non-AC', 'Both'] },
    { key: 'numRooms', label: 'Number of Rooms', type: 'number', placeholder: 'e.g., 3' },
    { key: 'parkingAvailable', label: 'Parking Available', type: 'toggle' },
    { key: 'amenities', label: 'Amenities', type: 'multiselect', options: ['Stage', 'Projector', 'Sound System', 'Green Room', 'Wi-Fi', 'Power Backup', 'Kitchen Access', 'Elevator', 'Wheelchair Access'] },
    { key: 'indoorOutdoor', label: 'Indoor / Outdoor', type: 'select', options: ['Indoor', 'Outdoor', 'Both'] },
    { key: 'cateringAllowed', label: 'Outside Catering Allowed', type: 'toggle' },
  ],
  catering: [
    { key: 'cuisineTypes', label: 'Cuisine Types', type: 'multiselect', options: ['North Indian', 'South Indian', 'Chinese', 'Mughlai', 'Continental', 'Thai', 'Gujarati', 'Bengali', 'Rajasthani', 'Italian', 'Mexican', 'Fusion'] },
    { key: 'foodType', label: 'Veg / Non-Veg / Both', type: 'select', options: ['Veg Only', 'Non-Veg Only', 'Both'], required: true },
    { key: 'pricePerPlate', label: 'Price Per Plate', type: 'number', placeholder: 'e.g., 800' },
    { key: 'minGuests', label: 'Minimum Guest Count', type: 'number', placeholder: 'e.g., 50' },
    { key: 'maxGuests', label: 'Maximum Guest Capacity', type: 'number', placeholder: 'e.g., 1000' },
    { key: 'menuPackages', label: 'Menu Packages Offered', type: 'textarea', placeholder: 'Describe your standard packages...' },
    { key: 'customMenu', label: 'Custom Menu Available', type: 'toggle' },
    { key: 'servingStaff', label: 'Serving Staff Included', type: 'toggle' },
  ],
  decoration: [
    { key: 'decoType', label: 'Decoration Type', type: 'multiselect', options: ['Floral', 'Stage Decor', 'Mandap', 'Entrance Gate', 'Backdrop', 'Ceiling Decor', 'Table Decor', 'Lighting Setup', 'Theme Decor'], required: true },
    { key: 'themes', label: 'Available Themes', type: 'multiselect', options: ['Traditional', 'Modern', 'Royal', 'Rustic', 'Garden', 'Beach', 'Vintage', 'Minimalist', 'Bohemian', 'Fusion'] },
    { key: 'eventTypes', label: 'Event Types Supported', type: 'multiselect', options: ['Wedding', 'Reception', 'Birthday', 'Anniversary', 'Corporate', 'Engagement', 'Baby Shower', 'Festival'] },
    { key: 'packageOptions', label: 'Package Options', type: 'textarea', placeholder: 'Describe your decoration packages...' },
    { key: 'packagePrice', label: 'Starting Package Price', type: 'number', placeholder: 'e.g., 15000' },
    { key: 'customTheme', label: 'Custom Theme Available', type: 'toggle' },
    { key: 'setupRemoval', label: 'Setup & Removal Included', type: 'toggle' },
  ],
  'lighting-sound': [
    { key: 'equipmentTypes', label: 'Equipment Types', type: 'multiselect', options: ['LED Lights', 'Fairy Lights', 'Moving Head', 'Laser', 'Haze Machine', 'Par Lights', 'Spot Lights', 'Stage Speakers', 'Line Array', 'Subwoofers', 'Wireless Mics', 'Mixing Console'], required: true },
    { key: 'eventCapacity', label: 'Event Capacity (guests)', type: 'number', placeholder: 'e.g., 1000' },
    { key: 'soundDetails', label: 'Sound System Details', type: 'text', placeholder: 'e.g., 2000W JBL system with wireless mics' },
    { key: 'lightingTypes', label: 'Lighting Types', type: 'multiselect', options: ['Stage Lighting', 'Mood Lighting', 'Architectural', 'Outdoor', 'LED Wall', 'Projection'] },
    { key: 'djAvailable', label: 'DJ Available', type: 'toggle' },
    { key: 'technicianIncluded', label: 'Technician Included', type: 'toggle' },
    { key: 'setupRemoval', label: 'Setup & Removal Included', type: 'toggle' },
  ],
  makeup: [
    { key: 'makeupServices', label: 'Makeup Services', type: 'multiselect', options: ['Bridal Makeup', 'Engagement Makeup', 'Reception Makeup', 'Party Makeup', 'Groom Makeup', 'Pre-Wedding Shoot', 'Airbrush Makeup', 'HD Makeup', 'SFX Makeup'], required: true },
    { key: 'clientType', label: 'Bridal / Groom / Party', type: 'multiselect', options: ['Bridal', 'Groom', 'Party', 'Family Members', 'Bridesmaids'] },
    { key: 'homeService', label: 'Home Service Available', type: 'toggle' },
    { key: 'trialAvailable', label: 'Trial Makeup Available', type: 'toggle' },
    { key: 'productsUsed', label: 'Products / Brands Used', type: 'text', placeholder: 'e.g., MAC, Huda Beauty, Charlotte Tilbury' },
    { key: 'maxPeople', label: 'Max People Per Booking', type: 'number', placeholder: 'e.g., 5' },
    { key: 'packageOptions', label: 'Package Options', type: 'textarea', placeholder: 'Describe your makeup packages...' },
  ],
  photographer: [
    { key: 'photoType', label: 'Photography Type', type: 'multiselect', options: ['Candid', 'Traditional', 'Portrait', 'Fashion', 'Product', 'Landscape', 'Drone/Aerial', 'Editorial', 'Documentary'], required: true },
    { key: 'eventTypes', label: 'Event Types Covered', type: 'multiselect', options: ['Wedding', 'Reception', 'Birthday', 'Corporate', 'Pre-Wedding', 'Engagement', 'Baby Shower', 'Product Launch'] },
    { key: 'packageDuration', label: 'Package Duration', type: 'text', placeholder: 'e.g., 8 hours, Full day, 2 days' },
    { key: 'numPhotographers', label: 'Number of Photographers', type: 'number', placeholder: 'e.g., 2' },
    { key: 'videographyAvailable', label: 'Videography Available', type: 'toggle' },
    { key: 'droneAvailable', label: 'Drone Available', type: 'toggle' },
    { key: 'albumIncluded', label: 'Album Included', type: 'toggle' },
    { key: 'editedPhotos', label: 'Edited Photos Included', type: 'toggle' },
    { key: 'deliveryTime', label: 'Delivery Time', type: 'text', placeholder: 'e.g., 2-3 weeks' },
  ],
  'chairs-rentals': [
    { key: 'itemTypes', label: 'Item Types', type: 'multiselect', options: ['Chiavari Chairs', 'Folding Chairs', 'Banquet Chairs', 'Plastic Chairs', 'Wooden Chairs', 'Velvet Chairs', 'Round Tables', 'Rectangular Tables', 'Cocktail Tables', 'Stools', 'Benches', 'Sofas'], required: true },
    { key: 'availableQty', label: 'Available Quantity', type: 'number', placeholder: 'e.g., 200' },
    { key: 'rentalPrice', label: 'Rental Price (per unit)', type: 'number', placeholder: 'e.g., 150' },
    { key: 'pricingUnit', label: 'Pricing Unit', type: 'select', options: ['Per Piece', 'Per Set of 10', 'Per Set of 50', 'Per Set of 100'], required: true },
    { key: 'deliveryAvailable', label: 'Delivery Available', type: 'toggle' },
    { key: 'setupAvailable', label: 'Setup Available', type: 'toggle' },
    { key: 'minOrder', label: 'Minimum Order Quantity', type: 'number', placeholder: 'e.g., 20' },
  ],
  other: [
    { key: 'serviceType', label: 'Service Type / Specialty', type: 'text', placeholder: 'e.g., Event Security, Valet Parking, etc.', required: true },
    { key: 'specialties', label: 'Specialties & Highlights', type: 'textarea', placeholder: 'Describe what makes your service unique...' },
    { key: 'equipmentAvailable', label: 'Equipment / Resources Available', type: 'textarea', placeholder: 'List any equipment or resources you provide...' },
  ],
}

// ─── Step labels ───────────────────────────────────────────────────────────────

const steps = [
  { label: 'Category', short: '1' },
  { label: 'Basic Info', short: '2' },
  { label: 'Details', short: '3' },
  { label: 'Pricing', short: '4' },
  { label: 'Availability', short: '5' },
  { label: 'Review', short: '6' },
]

// ─── Shared input classes ──────────────────────────────────────────────────────

const inputCls = 'w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white placeholder:text-secondary-text/40'
const labelCls = 'text-sm font-medium text-charcoal'
const sectionTitleCls = 'font-heading text-xl sm:text-2xl font-bold text-royal'
const sectionDescCls = 'text-sm text-secondary-text mt-1'

// ─── Helper: Tag multiselect ──────────────────────────────────────────────────

function TagSelect({ options, selected, onChange, placeholder }: { options: string[]; selected: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()))

  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val])
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-left outline-none transition focus:border-gold-deep focus:bg-white ${selected.length ? 'text-charcoal' : 'text-secondary-text/40'}`}
      >
        {selected.length ? `${selected.length} selected` : (placeholder || 'Select options')}
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-black/5">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-xl border border-black/10 bg-ivory/60 px-3 py-2 text-sm outline-none focus:border-gold-deep"
            />
          </div>
          {filtered.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-ivory/70 transition-colors"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition ${selected.includes(opt) ? 'bg-gold-deep border-gold-deep' : 'border-black/20'}`}>
                {selected.includes(opt) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              {opt}
            </button>
          ))}
          {filtered.length === 0 && <p className="px-4 py-3 text-sm text-secondary-text">No options found</p>}
        </div>
      )}
    </div>
  )
}

// ─── Helper: Toggle switch ────────────────────────────────────────────────────

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3">
      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-gold-deep' : 'bg-charcoal/20'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`} />
      </div>
      {label && <span className="text-sm text-charcoal">{label}</span>}
    </button>
  )
}

// ─── Image Upload Zone ────────────────────────────────────────────────────────

function ImageUpload({ label, multiple, files, onChange }: { label: string; multiple?: boolean; files: string[]; onChange: (urls: string[]) => void }) {
  const addDemo = () => {
    const demoImages = [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop',
    ]
    if (multiple) {
      const next = [...files, ...demoImages].slice(0, 10)
      onChange(next)
    } else {
      onChange([demoImages[0]])
    }
  }

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="mt-2 flex flex-wrap gap-3">
        {files.map((url, i) => (
          <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-black/10 group">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(files.filter((_, j) => j !== i))}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDemo}
          className="w-24 h-24 rounded-2xl border-2 border-dashed border-gold-deep/30 flex flex-col items-center justify-center gap-1 text-gold-deep hover:bg-gold/5 transition"
        >
          <Upload size={18} />
          <span className="text-[10px] font-medium">Add</span>
        </button>
      </div>
      <p className="mt-1.5 text-xs text-secondary-text">Click "Add" to upload images. Max {multiple ? '10' : '1'} image{multiple ? 's' : ''}.</p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AddServicePage() {
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  // Step 1
  const [category, setCategory] = useState<CategoryId | ''>('')

  // Step 2 – Basic Info
  const [title, setTitle] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [detailedDesc, setDetailedDesc] = useState('')
  const [coverImage, setCoverImage] = useState<string[]>([])
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [serviceArea, setServiceArea] = useState('')
  const [phone, setPhone] = useState('')
  const [startingPrice, setStartingPrice] = useState('')
  const [pricingType, setPricingType] = useState('')
  const [cancellationPolicy, setCancellationPolicy] = useState('')
  const [terms, setTerms] = useState('')

  // Step 3 – Category-specific
  const [catFields, setCatFields] = useState<Record<string, string | boolean | string[]>>({})

  // Step 4 – Pricing
  const [basePrice, setBasePrice] = useState('')
  const [priceType, setPriceType] = useState('')
  const [packages, setPackages] = useState<Array<{ name: string; price: string; desc: string; services: string }>>([])

  // Step 5 – Availability
  const [availDays, setAvailDays] = useState<string[]>([])
  const [availDates, setAvailDates] = useState('')
  const [noticePeriod, setNoticePeriod] = useState('')
  const [blockedDates, setBlockedDates] = useState('')

  const handlePublish = () => {
    if (!category) return
    const serviceId = `host-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const newService: Service = {
      id: serviceId,
      name: title || 'Untitled Service',
      location: city || 'Location TBD',
      description: shortDesc || detailedDesc || '',
      rating: 0,
      reviewCount: 0,
      price: Number(basePrice) || Number(startingPrice) || 0,
      image: coverImage[0] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
      tags: Object.values(catFields).flat().filter(v => typeof v === 'string' && v).slice(0, 5) as string[],
      verified: false,
      gallery: galleryImages.length > 0 ? galleryImages : undefined,
      categoryId: mapCategoryId(category),
      address: address || undefined,
      serviceArea: serviceArea || undefined,
      packages: packages.length > 0 ? packages.map(p => ({
        name: p.name || 'Custom Package',
        price: Number(p.price) || 0,
        features: p.services ? p.services.split(',').map(s => s.trim()) : [],
        duration: '',
      })) : undefined,
    }
    saveHostService(newService)
    setSubmitted(true)
  }

  const catDef = categories.find(c => c.id === category)
  const catFieldDefs = category ? categoryFields[category] || [] : []

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // ─── Validation per step ──────────────────────────────────────────────────

  const validateStep = (): boolean => {
    const errs: string[] = []
    if (step === 0 && !category) errs.push('Please select a service category.')
    if (step === 1) {
      if (!title.trim()) errs.push('Service title is required.')
      if (!shortDesc.trim()) errs.push('Short description is required.')
      if (!detailedDesc.trim()) errs.push('Detailed description is required.')
      if (!address.trim()) errs.push('Address is required.')
      if (!city.trim()) errs.push('City / Location is required.')
      if (!phone.trim()) errs.push('Contact number is required.')
    }
    if (step === 2) {
      for (const f of catFieldDefs) {
        if (f.required) {
          const val = catFields[f.key]
          if (f.type === 'multiselect' && Array.isArray(val) && val.length === 0) errs.push(`${f.label} is required.`)
          else if (f.type !== 'multiselect' && f.type !== 'toggle' && !val) errs.push(`${f.label} is required.`)
        }
      }
    }
    if (step === 3) {
      if (!basePrice.trim()) errs.push('Base price is required.')
      if (!priceType) errs.push('Pricing type is required.')
    }
    setErrors(errs)
    return errs.length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setErrors([])
      setStep(s => Math.min(s + 1, 5))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setErrors([])
    setStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ─── Success screen ──────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory">
        <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[80px]" />
          </div>
          <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-6 pt-28 pb-20 sm:py-28 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20 mb-8">
              <Sparkles size={36} className="text-gold-deep" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-royal">
              Service <span className="text-gold">Published!</span>
            </h1>
            <p className="mt-4 text-secondary-text max-w-md mx-auto text-base sm:text-lg leading-relaxed">
              Your service is now live. Customers can discover and book it from the FuncBook marketplace.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link to="/host/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-500">
                Go to Dashboard <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-500">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ─── Render helpers ──────────────────────────────────────────────────────

  const renderCatField = (f: FieldDef) => {
    const val = catFields[f.key]

    if (f.type === 'toggle') {
      return (
        <div key={f.key} className="flex items-center justify-between py-3 px-1 border-b border-black/5 last:border-0">
          <span className="text-sm text-charcoal">{f.label}</span>
          <Toggle checked={!!val} onChange={v => setCatFields(p => ({ ...p, [f.key]: v }))} />
        </div>
      )
    }

    if (f.type === 'multiselect') {
      return (
        <div key={f.key}>
          <TagSelect
            options={f.options || []}
            selected={(val as string[]) || []}
            onChange={v => setCatFields(p => ({ ...p, [f.key]: v }))}
            placeholder={f.placeholder || `Select ${f.label}`}
          />
        </div>
      )
    }

    if (f.type === 'select') {
      return (
        <div key={f.key} className="relative">
          <select
            value={(val as string) || ''}
            onChange={e => setCatFields(p => ({ ...p, [f.key]: e.target.value }))}
            className={`${inputCls} appearance-none pr-10`}
          >
            <option value="">Select {f.label}</option>
            {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text/60 pointer-events-none" />
        </div>
      )
    }

    if (f.type === 'textarea') {
      return (
        <textarea
          rows={3}
          value={(val as string) || ''}
          onChange={e => setCatFields(p => ({ ...p, [f.key]: e.target.value }))}
          placeholder={f.placeholder}
          className={`${inputCls} resize-none min-h-[90px]`}
        />
      )
    }

    return (
      <input
        type={f.type}
        value={(val as string) || ''}
        onChange={e => setCatFields(p => ({ ...p, [f.key]: e.target.value }))}
        placeholder={f.placeholder}
        className={inputCls}
      />
    )
  }

  const addPackage = () => {
    setPackages(p => [...p, { name: '', price: '', desc: '', services: '' }])
  }

  const removePackage = (i: number) => {
    setPackages(p => p.filter((_, j) => j !== i))
  }

  const updatePackage = (i: number, key: string, val: string) => {
    setPackages(p => p.map((pkg, j) => j === i ? { ...pkg, [key]: val } : pkg))
  }

  // ─── Stepper ─────────────────────────────────────────────────────────────

  const Stepper = () => (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between gap-0">
        {steps.map((s, i) => {
          const done = i < step
          const active = i === step
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 w-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  done ? 'bg-gold-deep text-white' : active ? 'bg-royal text-white ring-4 ring-royal/15' : 'bg-charcoal/10 text-charcoal/40'
                }`}>
                  {done ? <Check size={18} strokeWidth={3} /> : i + 1}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${active ? 'text-royal' : done ? 'text-gold-deep' : 'text-secondary-text/60'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 rounded-full transition-colors duration-300 ${done ? 'bg-gold-deep' : 'bg-charcoal/10'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  // ─── Step content ────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (step) {
      // ─── Step 1: Category ──────────────────────────────────────────────
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h2 className={sectionTitleCls}>Select Service Category</h2>
              <p className={sectionDescCls}>Choose the type of service you want to list on FuncBook.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map(cat => {
                const Icon = cat.icon
                const selected = category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`group relative text-left w-full rounded-2xl p-6 transition-all duration-300 ${
                      selected
                        ? 'bg-white border-2 border-gold-deep shadow-[0_8px_32px_rgba(184,134,11,0.15)]'
                        : 'bg-white border border-gold-deep/15 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] hover:border-gold-deep/30'
                    }`}
                  >
                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${selected ? 'bg-gold-deep scale-100 opacity-100' : 'bg-gold-deep/20 scale-75 opacity-0'}`}>
                      <Check size={13} className="text-white" strokeWidth={3} />
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${cat.iconBg} group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={cat.iconColor} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-royal">{cat.title}</h3>
                    <p className="mt-1 text-xs text-secondary-text leading-relaxed">{cat.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )

      // ─── Step 2: Basic Info ────────────────────────────────────────────
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className={sectionTitleCls}>Basic Information</h2>
              <p className={sectionDescCls}>Provide the essential details about your service.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><Briefcase size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Service Details</h3>
                  <p className="text-xs text-secondary-text">Basic information about your service</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Service Title / Business Name <span className="text-red-500">*</span></label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Royal Palace Banquet Hall" className={`${inputCls} mt-2`} />
                </div>
                <div>
                  <label className={labelCls}>Service Category</label>
                  <div className={`${inputCls} mt-2 bg-ivory/40 flex items-center gap-2`}>
                    {catDef && <catDef.icon size={16} className={catDef.iconColor} />}
                    <span>{catDef?.title || '—'}</span>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Contact Number <span className="text-red-500">*</span></label>
                  <div className="relative mt-2">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-secondary-text font-medium select-none">+91</span>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" className={`${inputCls} pl-[5.25rem]`} />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Short Description <span className="text-red-500">*</span></label>
                  <input type="text" value={shortDesc} onChange={e => setShortDesc(e.target.value)} placeholder="One-line summary of your service" className={`${inputCls} mt-2`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Detailed Description <span className="text-red-500">*</span></label>
                  <textarea rows={4} value={detailedDesc} onChange={e => setDetailedDesc(e.target.value)} placeholder="Describe your service, what makes it special, and what customers can expect..." className={`${inputCls} mt-2 resize-none min-h-[120px]`} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><Image size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Images</h3>
                  <p className="text-xs text-secondary-text">Upload photos of your service</p>
                </div>
              </div>
              <ImageUpload label="Cover Image" files={coverImage} onChange={setCoverImage} />
              <ImageUpload label="Gallery Images" multiple files={galleryImages} onChange={setGalleryImages} />
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><MapPin size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Location</h3>
                  <p className="text-xs text-secondary-text">Where your service is available</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address <span className="text-red-500">*</span></label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Full street address" className={`${inputCls} mt-2`} />
                </div>
                <div>
                  <label className={labelCls}>City / Location <span className="text-red-500">*</span></label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., Bangalore" className={`${inputCls} mt-2`} />
                </div>
                <div>
                  <label className={labelCls}>Service Area</label>
                  <input type="text" value={serviceArea} onChange={e => setServiceArea(e.target.value)} placeholder="e.g., Within 30 km radius" className={`${inputCls} mt-2`} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><IndianRupee size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Pricing Overview</h3>
                  <p className="text-xs text-secondary-text">Set a starting price for your service</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Starting Price</label>
                  <div className="relative mt-2">
                    <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                    <input type="number" value={startingPrice} onChange={e => setStartingPrice(e.target.value)} placeholder="e.g., 25000" min={0} className={`${inputCls} pl-11`} />
                  </div>
                </div>
                <div className="relative">
                  <label className={labelCls}>Pricing Type</label>
                  <select value={pricingType} onChange={e => setPricingType(e.target.value)} className={`${inputCls} mt-2 appearance-none pr-10`}>
                    <option value="">Select pricing type</option>
                    <option value="per-event">Per Event</option>
                    <option value="per-hour">Per Hour</option>
                    <option value="per-day">Per Day</option>
                    <option value="per-plate">Per Plate</option>
                    <option value="per-person">Per Person</option>
                    <option value="package">Package</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-[calc(50%+14px)] -translate-y-1/2 text-secondary-text/60 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><FileText size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Policies</h3>
                  <p className="text-xs text-secondary-text">Cancellation and terms information</p>
                </div>
              </div>
              <div>
                <label className={labelCls}>Cancellation Policy</label>
                <textarea rows={3} value={cancellationPolicy} onChange={e => setCancellationPolicy(e.target.value)} placeholder="Describe your cancellation and refund policy..." className={`${inputCls} mt-2 resize-none`} />
              </div>
              <div>
                <label className={labelCls}>Terms & Conditions</label>
                <textarea rows={3} value={terms} onChange={e => setTerms(e.target.value)} placeholder="Any specific terms or conditions for your service..." className={`${inputCls} mt-2 resize-none`} />
              </div>
            </div>
          </div>
        )

      // ─── Step 3: Category-Specific Fields ──────────────────────────────
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className={sectionTitleCls}>Category Details</h2>
              <p className={sectionDescCls}>Provide specific information for <span className="font-semibold text-royal">{catDef?.title}</span> services.</p>
            </div>
            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                {catDef && <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${catDef.iconBg}`}><catDef.icon size={18} className={catDef.iconColor} /></div>}
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">{catDef?.title} Specifics</h3>
                  <p className="text-xs text-secondary-text">Fields relevant to your selected category</p>
                </div>
              </div>
              <div className="space-y-5">
                {catFieldDefs.map(f => (
                  <div key={f.key}>
                    {f.type !== 'toggle' && (
                      <label className={labelCls}>
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                    )}
                    <div className={f.type !== 'toggle' ? 'mt-2' : ''}>
                      {renderCatField(f)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      // ─── Step 4: Pricing & Packages ────────────────────────────────────
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className={sectionTitleCls}>Pricing & Packages</h2>
              <p className={sectionDescCls}>Set your base price and create custom packages.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><IndianRupee size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Base Pricing</h3>
                  <p className="text-xs text-secondary-text">Set your starting price and pricing model</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Base / Starting Price <span className="text-red-500">*</span></label>
                  <div className="relative mt-2">
                    <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                    <input type="number" value={basePrice} onChange={e => setBasePrice(e.target.value)} placeholder="e.g., 25000" min={0} className={`${inputCls} pl-11`} />
                  </div>
                </div>
                <div className="relative">
                  <label className={labelCls}>Pricing Type <span className="text-red-500">*</span></label>
                  <select value={priceType} onChange={e => setPriceType(e.target.value)} className={`${inputCls} mt-2 appearance-none pr-10`}>
                    <option value="">Select pricing type</option>
                    <option value="per-event">Per Event</option>
                    <option value="per-hour">Per Hour</option>
                    <option value="per-day">Per Day</option>
                    <option value="per-plate">Per Plate</option>
                    <option value="per-person">Per Person</option>
                    <option value="package">Package</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-[calc(50%+14px)] -translate-y-1/2 text-secondary-text/60 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><Star size={18} className="text-gold-deep" /></div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-royal">Custom Packages</h3>
                    <p className="text-xs text-secondary-text">Add optional service packages</p>
                  </div>
                </div>
                <button type="button" onClick={addPackage} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/10 text-gold-deep text-xs font-semibold hover:bg-gold/20 transition">
                  <Plus size={14} /> Add Package
                </button>
              </div>

              {packages.length === 0 && (
                <div className="text-center py-8 text-secondary-text text-sm">
                  No packages added yet. Click "Add Package" to create one.
                </div>
              )}

              <div className="space-y-4">
                {packages.map((pkg, i) => (
                  <div key={i} className="rounded-2xl border border-gold-deep/10 bg-ivory/40 p-5 space-y-4 relative">
                    <button type="button" onClick={() => removePackage(i)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Package Name</label>
                        <input type="text" value={pkg.name} onChange={e => updatePackage(i, 'name', e.target.value)} placeholder="e.g., Silver Package" className={`${inputCls} mt-2`} />
                      </div>
                      <div>
                        <label className={labelCls}>Price</label>
                        <div className="relative mt-2">
                          <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                          <input type="number" value={pkg.price} onChange={e => updatePackage(i, 'price', e.target.value)} placeholder="e.g., 35000" min={0} className={`${inputCls} pl-11`} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea rows={2} value={pkg.desc} onChange={e => updatePackage(i, 'desc', e.target.value)} placeholder="What's included in this package..." className={`${inputCls} mt-2 resize-none`} />
                    </div>
                    <div>
                      <label className={labelCls}>Included Services</label>
                      <input type="text" value={pkg.services} onChange={e => updatePackage(i, 'services', e.target.value)} placeholder="e.g., Stage decor, 2 photographers, DJ" className={`${inputCls} mt-2`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      // ─── Step 5: Availability ──────────────────────────────────────────
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className={sectionTitleCls}>Availability</h2>
              <p className={sectionDescCls}>Set your working days and availability schedule.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><CalendarDays size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Working Days</h3>
                  <p className="text-xs text-secondary-text">Select the days you are available</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {allDays.map(day => {
                  const active = availDays.includes(day)
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setAvailDays(p => active ? p.filter(d => d !== day) : [...p, day])}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        active
                          ? 'bg-gold-deep text-white shadow-[0_4px_12px_rgba(184,134,11,0.25)]'
                          : 'bg-ivory text-charcoal border border-black/10 hover:border-gold-deep/30'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center"><Clock size={18} className="text-gold-deep" /></div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-royal">Booking Details</h3>
                  <p className="text-xs text-secondary-text">Set notice periods and date ranges</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Available Dates / Period</label>
                  <input type="text" value={availDates} onChange={e => setAvailDates(e.target.value)} placeholder="e.g., Jan 2025 – Dec 2025" className={`${inputCls} mt-2`} />
                </div>
                <div>
                  <label className={labelCls}>Booking Notice Period</label>
                  <div className="relative mt-2">
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                    <select value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} className={`${inputCls} pl-11 appearance-none pr-10`}>
                      <option value="">Select notice period</option>
                      <option value="1-day">1 Day Before</option>
                      <option value="3-days">3 Days Before</option>
                      <option value="1-week">1 Week Before</option>
                      <option value="2-weeks">2 Weeks Before</option>
                      <option value="1-month">1 Month Before</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text/60 pointer-events-none" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Blocked / Unavailable Dates</label>
                  <textarea rows={2} value={blockedDates} onChange={e => setBlockedDates(e.target.value)} placeholder="e.g., Dec 25, Jan 1, Jan 26 (comma-separated)" className={`${inputCls} mt-2 resize-none`} />
                </div>
              </div>
            </div>
          </div>
        )

      // ─── Step 6: Review & Submit ───────────────────────────────────────
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className={sectionTitleCls}>Review & Submit</h2>
              <p className={sectionDescCls}>Review your service details before publishing.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-6">
              {/* Category */}
              <div className="pb-5 border-b border-black/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep mb-1">Category</p>
                    <div className="flex items-center gap-2">
                      {catDef && <catDef.icon size={18} className={catDef.iconColor} />}
                      <span className="font-heading text-lg font-bold text-royal">{catDef?.title}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(0)} className="text-xs font-semibold text-gold-deep hover:underline">Edit</button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="pb-5 border-b border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Basic Information</p>
                  <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-gold-deep hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-secondary-text">Title:</span> <span className="font-medium text-royal">{title || '—'}</span></div>
                  <div><span className="text-secondary-text">Phone:</span> <span className="font-medium text-royal">+91 {phone || '—'}</span></div>
                  <div className="sm:col-span-2"><span className="text-secondary-text">Short Desc:</span> <span className="font-medium text-royal">{shortDesc || '—'}</span></div>
                  <div><span className="text-secondary-text">City:</span> <span className="font-medium text-royal">{city || '—'}</span></div>
                  <div><span className="text-secondary-text">Starting Price:</span> <span className="font-medium text-royal">{startingPrice ? `₹${startingPrice}` : '—'}</span></div>
                </div>
              </div>

              {/* Category Details */}
              <div className="pb-5 border-b border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Category Details</p>
                  <button type="button" onClick={() => setStep(2)} className="text-xs font-semibold text-gold-deep hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {catFieldDefs.slice(0, 8).map(f => {
                    const val = catFields[f.key]
                    let display = '—'
                    if (f.type === 'toggle') display = val ? 'Yes' : 'No'
                    else if (f.type === 'multiselect' && Array.isArray(val)) display = val.length ? val.join(', ') : '—'
                    else if (val) display = String(val)
                    return (
                      <div key={f.key}>
                        <span className="text-secondary-text">{f.label}: </span>
                        <span className="font-medium text-royal">{display}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pricing */}
              <div className="pb-5 border-b border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Pricing & Packages</p>
                  <button type="button" onClick={() => setStep(3)} className="text-xs font-semibold text-gold-deep hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-secondary-text">Base Price:</span> <span className="font-medium text-royal">{basePrice ? `₹${basePrice}` : '—'}</span></div>
                  <div><span className="text-secondary-text">Pricing Type:</span> <span className="font-medium text-royal">{priceType || '—'}</span></div>
                  {packages.length > 0 && (
                    <div className="sm:col-span-2">
                      <span className="text-secondary-text">Packages: </span>
                      <span className="font-medium text-royal">{packages.map(p => p.name || 'Unnamed').join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Availability</p>
                  <button type="button" onClick={() => setStep(4)} className="text-xs font-semibold text-gold-deep hover:underline">Edit</button>
                </div>
                <div className="text-sm">
                  <span className="text-secondary-text">Working Days: </span>
                  <span className="font-medium text-royal">{availDays.length ? availDays.join(', ') : '—'}</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // ─── Main render ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-ivory pb-28 lg:pb-8">
      {/* Header */}
      <section className="pt-28 sm:pt-24">
        <div className="w-full max-w-[min(92%,1500px)] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/host/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-secondary-text hover:text-gold-deep transition-colors shrink-0">
              <ArrowLeft size={16} /> Back
            </Link>
            <div className="h-3 w-px bg-black/10" />
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-deep text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} /> Add New Service
            </div>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-royal leading-[1.08] tracking-tight">
            Add New Service
          </h1>
          <p className="mt-3 mb-10 text-secondary-text max-w-2xl text-base sm:text-lg leading-relaxed">
            Provide the details of your service to start receiving bookings.
          </p>
        </div>
      </section>

      {/* Stepper */}
      <div className="w-full max-w-[min(92%,1500px)] mx-auto px-6 sm:px-8 lg:px-10">
        <Stepper />
      </div>

      {/* Step content */}
      <div className="w-full max-w-[min(92%,1500px)] mx-auto px-6 sm:px-8 lg:px-10">
        {renderStep()}
      </div>

      {/* Errors - anchored bottom-left above action bar */}
      {errors.length > 0 && (
        <div className="w-full max-w-[min(92%,1500px)] mx-auto px-6 sm:px-8 lg:px-10 mt-6 mb-2">
          <div className="animate-fade-in bg-red-50 border border-red-200/60 rounded-2xl p-4 inline-block">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-700">Please fix the following:</p>
                <ul className="mt-2 space-y-1">
                  {errors.map((err, i) => <li key={i} className="text-sm text-red-600">{err}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-gold-deep/10 bg-white/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] lg:static lg:z-auto lg:border-t lg:border-gold-deep/10 lg:bg-ivory lg:backdrop-blur-none lg:shadow-none">
        <div className="w-full max-w-[min(92%,1500px)] mx-auto px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between gap-4">
          <div>
            {step > 0 ? (
              <button onClick={prevStep} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300">
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <Link to="/host/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300">
                <ArrowLeft size={16} /> Back
              </Link>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-secondary-text">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-deep" />
            <span className="font-semibold text-royal">Step {step + 1}</span>
            <span>of {steps.length}</span>
          </div>

          <div className="flex items-center gap-3">
            {step === 5 ? (
              <>
                <button
                  onClick={handlePublish}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300"
                >
                  <Save size={16} /> Save Draft
                </button>
                <button
                  onClick={handlePublish}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-300"
                >
                  <Send size={16} /> Publish Service
                </button>
              </>
            ) : (
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-300"
              >
                Continue <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
