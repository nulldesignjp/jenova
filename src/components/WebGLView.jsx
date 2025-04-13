import React from 'react'
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

import '../styles/frame.styl'
import webgl from '../scenes/WebGLSceneManager.js'


function WebGLView()
{
  //  pseudo construct
  const canvas = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    console.log('mounted');
    console.log(canvas.current)

    //  極論こんな感じか
    // const hoge;
    // if (!canvas.current) {
    //   canvas.current = new webgl({
    //  canvas: canvas.current
    // });
    // }
    const hoge = new webgl({
      canvas: canvas.current
    });

    return () => {
      console.log('unmounted');
      // hoge.dispose()
    };
  },[])


  React.useEffect(() => {
    console.log('mounted');
    console.log("今いるパス：", location.pathname);

    // ルートに応じて演出切り替え
    switch (location.pathname) {
      case '/':
        // sceneManager.loadScene('Title');
        console.log('/')
        break;
      case '/web':
        // sceneManager.loadScene('Gallery');
        console.log('web')
        break;
      case '/ai':
        // sceneManager.loadScene('Heavy');
        console.log('AI')
        break;
    }

    return () => {
      console.log('unmounted');
      // hoge.dispose()
    };
  }, [location.pathname]);

  return (
    <canvas className="webglview" ref={canvas}></canvas>
  )
}

export default WebGLView