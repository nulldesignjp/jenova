import React from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

import '../styles/frame.styl'
import webgl from '../scenes/WebGLSceneManager.js'


function WebGLView()
{
  //  pseudo construct
  const canvas = React.useRef();  //  dom
  const engine = React.useRef();  //  instance
  const location = useLocation(); //  url

  React.useEffect(() => {
    console.log('mounted');
    console.log(canvas.current)

    //  極論こんな感じか
    // if (!canvas.current) {
    //   canvas.current = new webgl({
    //  canvas: canvas.current
    // });
    // }
    
    engine.current = new webgl({
      canvas: canvas.current
    });

    return () => {
      console.log('unmounted');
      engine.current.dispose();
      engine.current = null;
    };
  },[])

  React.useEffect(() => {
    console.log('mounted');
    // console.log("今いるパス：", location.pathname);

    console.log(location)

    // URLに応じて演出切り替え
    engine.current.loadScene( location.pathname );

    return () => {
      console.log('unmounted');
    };
  }, [location.pathname]);

  return (
    <canvas className="webglview" ref={canvas}></canvas>
  )
}

export default WebGLView