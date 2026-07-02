import { useState, useEffect } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { FaGoogle, FaApple } from 'react-icons/fa'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setEmail('')
      setPassword('')
      setShowPassword(false)
      setShowPasswordField(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(17,17,17,0.45)] backdrop-blur-[6px]" onClick={onClose} />

      <div className="relative w-[440px] max-w-full bg-white rounded-[24px] shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] p-10 animate-modal-enter">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-secondary-text hover:text-royal hover:bg-ivory transition-all duration-300"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-heading text-[28px] font-bold tracking-tight text-royal mb-1">
            Func<span className="text-gold">Book</span>
          </span>
          <h3 className="font-heading text-[22px] font-bold text-royal">Log in or sign up</h3>
          <p className="text-sm text-secondary-text mt-2">Phone number or email</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4">
          <input
            id="modal-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Phone number or email"
            className="w-full h-14 px-5 bg-white border border-[#E5E7EB] rounded-[16px] font-body text-base text-royal placeholder:text-[#9CA3AF] outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/30"
          />

          {showPasswordField && (
            <div className="relative">
              <input
                id="modal-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-14 px-5 pr-12 bg-white border border-[#E5E7EB] rounded-[16px] font-body text-base text-royal placeholder:text-[#9CA3AF] outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-royal transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            onClick={() => { if (!showPasswordField) setShowPasswordField(true) }}
            className="w-full h-14 bg-royal text-white font-semibold text-base rounded-xl hover:bg-gold hover:text-royal transition-all duration-300"
          >
            {showPasswordField ? 'Log In' : 'Continue'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#F3F4F6]" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-secondary-text">or</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            aria-label="Continue with Google"
            className="w-11 h-11 rounded-md bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
          >
            <FaGoogle size={18} className="text-[#4285F4]" />
          </button>
          <button
            type="button"
            aria-label="Continue with Apple"
            className="w-11 h-11 rounded-md bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
          >
            <FaApple size={18} className="text-royal" />
          </button>
        </div>
      </div>
    </div>
  )
}
