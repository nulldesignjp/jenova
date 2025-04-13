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
          <li>HOEM</li>
          <li>WEB</li>
          <li>AI</li>
          <li>404</li>
          <li>...</li>

          <li><a href='/'>home</a></li> {/* Linkがうまく機能しないのでA直書きでチェック */}
          <li><a href='/web'>web</a></li>
          <li><a href='/ai'>ai</a></li>
          {/* <li><Link to="/web">Web</Link></li> */}
          {/* <li><Link to="/">GO TO HOEM</Link></li> エラー出るので一度外す*/}
        </ul>
      </nav>
    )
  }
}
