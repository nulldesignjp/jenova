import React from 'react'
import { Link } from "react-router-dom"

import '../styles/frame.styl'



const SiteNavigation = () =>
{
  return (
    <nav className="siteNavigation">
      <ul>
      <li><Link to="/">HOEM</Link></li>
      <li><Link to="/web">Web</Link></li>
      <li><Link to="/ai">AI</Link></li>
      <li><Link to="/text">Text</Link></li>
      <li>....</li>
      </ul>
    </nav>
  )
}

export default SiteNavigation;