// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SiteHeader from './components/SiteHeader.tsx'
import SiteFooter from './components/SiteFooter.tsx'
import SiteNavigation from './components/SiteNavigation.tsx'
import Pages from './pages/_router.tsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.styl'

createRoot(document.getElementById('root')!).render(
  <div className="wrapper">
    <BrowserRouter>
      <SiteHeader />
      <SiteNavigation />
      <Pages />
      <SiteFooter />
    </BrowserRouter>
  </div>,
)
