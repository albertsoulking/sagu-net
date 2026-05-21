import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import CoveragePage from '@/pages/CoveragePage'
import PricingPage from '@/pages/PricingPage'
import CareersPage from '@/pages/CareersPage'
import NewsPage from '@/pages/NewsPage'
import ContactPage from '@/pages/ContactPage'
import TermsPage from '@/pages/TermsPage'
import PrivacyPage from '@/pages/PrivacyPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/coverage', element: <CoveragePage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/careers', element: <CareersPage /> },
      { path: '/news', element: <NewsPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
