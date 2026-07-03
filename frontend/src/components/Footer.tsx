import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6'

const exploreLinks = ['Function Halls', 'Catering', 'Decoration', 'Photography', 'Makeup Artists']
const supportLinks = ['Help Center', 'Contact', 'FAQs', 'Terms', 'Privacy Policy']

export default function Footer() {
  return (
    <footer className="bg-royal text-white mt-20">
      <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <div className="font-heading text-2xl font-bold tracking-tight">
              Func<span className="text-gold">Book</span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Your premium platform for booking exceptional event services. 
              Connecting you with the finest vendors for unforgettable celebrations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 hover:text-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 hover:text-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="text-gold shrink-0" />
                <span>hello@funcbook.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="text-gold shrink-0" />
                <span>+91 1800-123-456</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={14} className="text-gold shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © 2026 FuncBook. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
