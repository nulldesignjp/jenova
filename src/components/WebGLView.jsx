import React from 'react'
import { Link } from "react-router-dom"

import '../styles/frame.styl'


function WebGLView()
{
  //  pseudo construct
  const canvas = React.useRef();

  React.useEffect(() => {
    console.log('mounted');


  console.log(canvas.current)

    //  極論こんな感じか
    // ES6で書く
    // const hoge = new WEBGL(canvas);

    return () => {
      console.log('unmounted');
      // hoge.dispose()
    };
  }, []);

  return (
    <canvas className="webglview" ref={canvas}></canvas>
  )
}

export default WebGLView