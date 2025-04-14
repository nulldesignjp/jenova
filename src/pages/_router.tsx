import React from 'react'

import { Routes, Route } from "react-router-dom"
import Index from './index.jsx'
import Web from './Web.jsx'
import Ai from './Ai.jsx'
import Page404 from './Page404.jsx'

function App()
{
  return(
    <>
      <Routes>
        <Route path="/" element={ <Index /> } />
        <Route path="/web" element={ <Web /> } />
        <Route path="/ai" element={ <Ai /> } />
        <Route path="*" element={ <Page404 /> } />
      </Routes>
    </>
  )
}

export default App