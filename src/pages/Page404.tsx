import { useState } from 'react'
import { Link } from "react-router-dom"

function Page404() {
  
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h1>File Not Found 404.</h1>
      <p><Link to="/">HOEM</Link></p>
    </>
  )
}

export default Page404
