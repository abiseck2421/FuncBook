import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Sparkles, Building2, User,
  Phone, MapPin, Star, Users, TrendingUp,
  Camera, Mail, Globe, AlertCircle, Upload, X, LayoutDashboard,
} from 'lucide-react'

const inputCls = 'w-full rounded-2xl border border-black/10 bg-ivory/60 px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold-deep focus:bg-white placeholder:text-secondary-text/40'
const labelCls = 'text-sm font-medium text-charcoal'

export default function BecomeHostPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useOutletContext<{ isAuthenticated: boolean }>()
  const [errors, setErrors] = useState<string[]>([])
  const [profileNotice, setProfileNotice] = useState<string | null>(null)

  const hasHostProfile = !!localStorage.getItem('funcbook_host_profile')

  const [businessName, setBusinessName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [businessDesc, setBusinessDesc] = useState('')
  const [gstNumber, setGstNumber] = useState('')
  const [profileImage, setProfileImage] = useState<string[]>([])
  const [website, setWebsite] = useState('')

  const addDemoImage = () => {
    setProfileImage(['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'])
  }

  const validate = (): boolean => {
    const errs: string[] = []
    if (!businessName.trim()) errs.push('Business name is required.')
    if (!ownerName.trim()) errs.push('Owner / contact name is required.')
    if (!email.trim()) errs.push('Email address is required.')
    if (!phone.trim()) errs.push('Contact number is required.')
    if (!city.trim()) errs.push('City / location is required.')
    if (!businessDesc.trim()) errs.push('Business description is required.')
    setErrors(errs)
    return errs.length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      localStorage.setItem('funcbook_host_profile', 'true')
      navigate('/host/dashboard')
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  const handleGoToDashboard = () => {
    if (!isAuthenticated) {
      setProfileNotice('Please log in first to access your host dashboard.')
      return
    }
    if (hasHostProfile) {
      navigate('/host/dashboard')
    } else {
      setProfileNotice('No host profile found. Complete the form below to create one.')
      document.getElementById('host-profile-form')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-ivory pb-28 lg:pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gold/8 blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-deep text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} />
                Start Earning Today
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-royal leading-[1.08] tracking-tight">
                Become a Host
                <br />
                on <span className="text-gold">FuncBook</span>
              </h1>

              <p className="max-w-lg text-base sm:text-lg text-secondary-text leading-relaxed">
                Create your host profile and start listing services to receive bookings
                from thousands of customers.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gold" />
                  <span className="text-xs sm:text-sm text-secondary-text font-medium">2000+ Active Hosts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-gold" />
                  <span className="text-xs sm:text-sm text-secondary-text font-medium">4.9 Host Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-gold" />
                  <span className="text-xs sm:text-sm text-secondary-text font-medium">15K+ Bookings</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-gold/5 blur-[80px] rounded-[32px]" />
              <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.08)] p-7 sm:p-8 animate-float border border-white/60">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1000&fit=crop"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-white/10" />
                <div className="relative z-10">
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">Start Earning Today</h3>
                    <p className="text-xs sm:text-sm text-secondary-text mt-1.5">Share your space, grow your business.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[
                      { icon: Building2, label: 'Venues' },
                      { icon: Users, label: '2000+ Hosts' },
                      { icon: Star, label: '4.9 Rating' },
                      { icon: TrendingUp, label: 'Growing' },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(184,134,11,0.1)] hover:border-gold/30">
                          <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                            <Icon size={17} className="text-gold-deep" />
                          </div>
                          <span className="text-xs font-semibold text-charcoal">{item.label}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={12} className="fill-gold text-gold -mr-0.5 last:mr-0" />
                        ))}
                      </div>
                      <span className="font-bold text-royal">4.9</span>
                      <span className="text-secondary-text">Rating</span>
                    </div>
                    <div className="text-secondary-text">
                      <span className="font-semibold text-royal">1200+</span> Events
                    </div>
                    <div className="text-secondary-text">
                      <span className="font-semibold text-royal">500+</span> Vendors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Already a Host? */}
      <section className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 -mt-2 sm:-mt-4 mb-4">
        <div className="relative overflow-hidden bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/3 pointer-events-none rounded-3xl" />
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <LayoutDashboard size={22} className="text-gold-deep" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-royal">Already a Host?</h3>
              <p className="mt-1 text-sm text-secondary-text leading-relaxed max-w-lg">
                Access your existing host account and manage your services and bookings.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleGoToDashboard}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-royal text-white font-semibold text-sm shadow-[0_8px_20px_rgba(17,17,17,0.15)] hover:bg-gold-deep hover:shadow-[0_8px_20px_rgba(184,134,11,0.25)] transition-all duration-300 shrink-0"
          >
            Go to Host Dashboard
            <ArrowUpRight size={16} />
          </button>
        </div>
        {profileNotice && (
          <div className="mt-3 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-700 text-sm font-medium">
              <AlertCircle size={15} className="shrink-0" />
              {profileNotice}
            </div>
          </div>
        )}
      </section>

      {/* Profile Form */}
      <section id="host-profile-form" className="w-full max-w-[min(95%,1400px)] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-deep mb-4">
            Create Your Profile
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-royal">
            Host Profile
          </h2>
          <p className="mt-4 text-secondary-text max-w-md mx-auto">
            Tell us about your business. This information will be visible to customers.
          </p>
        </div>

        {/* Profile Image */}
        <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Camera size={18} className="text-gold-deep" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-royal">Profile Photo</h3>
              <p className="text-xs text-secondary-text">Upload a photo for your host profile</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {profileImage.length > 0 ? (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-black/10 group">
                <img src={profileImage[0]} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setProfileImage([])}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={addDemoImage}
                className="w-20 h-20 rounded-2xl border-2 border-dashed border-gold-deep/30 flex flex-col items-center justify-center gap-1 text-gold-deep hover:bg-gold/5 transition"
              >
                <Upload size={20} />
                <span className="text-[10px] font-medium">Upload</span>
              </button>
            )}
            <p className="text-xs text-secondary-text">Click to upload. Recommended: 200x200px, JPG or PNG.</p>
          </div>
        </div>

        {/* Business Details + Contact Info side by side on desktop */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Business Details */}
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Building2 size={18} className="text-gold-deep" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-royal">Business Details</h3>
                <p className="text-xs text-secondary-text">Basic information about your business</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Business Name <span className="text-red-500">*</span></label>
                <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="e.g., Royal Events Pvt. Ltd." className={`${inputCls} mt-2`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>GST Number</label>
                  <input type="text" value={gstNumber} onChange={e => setGstNumber(e.target.value)} placeholder="Optional" className={`${inputCls} mt-2`} />
                </div>
                <div>
                  <label className={labelCls}>Website</label>
                  <div className="relative mt-2">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                    <input type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="your-site.com" className={`${inputCls} pl-11`} />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>Business Description <span className="text-red-500">*</span></label>
                <textarea rows={4} value={businessDesc} onChange={e => setBusinessDesc(e.target.value)} placeholder="Describe your business, services, and what makes you stand out..." className={`${inputCls} mt-2 resize-none min-h-[120px]`} />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl border border-gold-deep/15 shadow-[0_4px_24px_rgba(184,134,11,0.08)] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <User size={18} className="text-gold-deep" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-royal">Contact Information</h3>
                <p className="text-xs text-secondary-text">How customers can reach you</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Owner / Contact Name <span className="text-red-500">*</span></label>
                <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="Full name" className={`${inputCls} mt-2`} />
              </div>
              <div>
                <label className={labelCls}>Email Address <span className="text-red-500">*</span></label>
                <div className="relative mt-2">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={`${inputCls} pl-11`} />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>City / Location <span className="text-red-500">*</span></label>
                  <div className="relative mt-2">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60" />
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., Bangalore" className={`${inputCls} pl-11`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Full Address</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, landmark" className={`${inputCls} mt-2`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-6">
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

        {/* Submit */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-royal font-semibold text-sm ring-1 ring-black/10 hover:ring-gold-deep hover:text-gold-deep transition-all duration-300"
          >
            Back
          </Link>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gold-deep text-white font-semibold text-sm shadow-[0_12px_24px_rgba(184,134,11,0.3)] hover:bg-royal hover:shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-300"
          >
            Create Profile & Go to Dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}
