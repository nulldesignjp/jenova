// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pages from './pages/_router.jsx'

import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SiteNavigation from './components/SiteNavigation.jsx';
import WebGLView from './components/WebGLView.jsx';

import { BrowserRouter } from 'react-router-dom'
import './styles/global.styl'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="wrapper">
      <SiteHeader />
      <SiteNavigation />
        <Pages />
      <SiteFooter />
      <WebGLView />
    </div>
  </BrowserRouter>,
)
