import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function FloatingContactButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/contact')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow duration-300 cursor-pointer animate-pulse-glow"
      aria-label="Contact us"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
