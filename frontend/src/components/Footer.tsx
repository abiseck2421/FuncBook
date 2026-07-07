import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa6'

const companyLinks = ['About', 'Careers', 'Blog', 'Contact']
const serviceLinks = ['Function Halls', 'Catering', 'Decoration', 'Photography', 'Makeup', 'Lighting & Sound']
const supportLinks = ['Help Center', 'Terms', 'Privacy Policy', 'FAQs']

export default function Footer() {
  return (
    <footer className="bg-royal text-white">
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

            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/60 hover:text-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
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

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="text-gold shrink-0" />
                <span>hello@funcbook.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="text-gold shrink-0" />
                <span>+91 1800-123-456</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={14} className="text-gold shrink-0" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="w-full max-w-[min(95%,1400px)] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © 2026 FuncBook. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
