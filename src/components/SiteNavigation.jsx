import React from 'react'
import { Link } from "react-router-dom"

import '../styles/frame.styl'

export default class SiteNavigation extends React.Component
{
  constructor()
  {
    super();
  }

  render()
  {
    return(
      <nav className="siteNavigation">
        <ul>
        <li><Link to="/">HOEM</Link></li>
        <li><Link to="/web">Web</Link></li>
        <li><Link to="/ai">AI</Link></li>
        <li>....</li>
        </ul>
      </nav>
    )
  }
}
