import React from 'react'

import { Routes, Route } from "react-router-dom"
import Index from './Index.tsx'
import Web from './Web.tsx'
import Ai from './Ai.tsx'
import Text from './Text.tsx'
import Page404 from './Page404.tsx'

function App()
{
  return(
    <>
      <Routes>
        <Route path="/" element={ <Index /> } />
        <Route path="/web" element={ <Web /> } />
        <Route path="/ai" element={ <Ai /> } />
        <Route path="/text" element={ <Text /> } />
        <Route path="*" element={ <Page404 /> } />
      </Routes>
    </>
  )
}

export default App