import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

//
import { useLocation } from "react-router-dom";

//  Jenova
import gsap from 'gsap'
import * as THREE from 'three'
import { getOrCreateApp } from '../libs/jenova/core/runtime';
import Jenova from '../libs/jenova'
import Wire from '../libs/jenova/core/Wire.js'
import PlaneImage from '../libs/jenova/utils/PlaneImage.js'

let app

const ArtWorks = ()=> {

  const myCanvas = useRef<HTMLCanvasElement>(null);
  const reunion = useRef<Jenova | null>(null);
  const updatekey = useRef<number>(null);

  const location = useLocation();

  const img = useRef<THREE.Mesh | null>(null);
  const mesh = useRef<Wire | null>(null);
  const sphere = useRef<Wire | null>(null);

  useEffect(()=>{

    console.log('ArtWorks.useEffect');
    //  全体設計の見直し、シーンの遅延読み込み、ホットリロード対策と課題が山積みですねw

    if( myCanvas.current )
    {
      // reunion.current = new Jenova({
      //   canvas: myCanvas.current
      // });
      reunion.current = getOrCreateApp(
        () => new Jenova({
          canvas: myCanvas.current
        })
      );

      //  確認用のメッシュを追加
      mesh.current = Wire.Box( 100, 0x666666 );
      reunion.current.add( mesh.current );

      //  これだと一緒
      //  https://gsap.com/docs/v3/Eases
      mesh.current.position.y = -50
      let _hoges = ()=>{
          gsap.to( mesh.current.position,
              {
                  x: 0,
                  y: 50,
                  z: 0,
                  duration: 3.0,
                  ease: 'expo.inOut',
                  yoyo: true,
                  repeat: -1,
                  onComplete: ()=>{
                      console.log('onComplete')
                  }
              })
      }
      _hoges()

      sphere.current = Wire.Sphere( 50, 32, 0xFF0000 );
      reunion.current.add( sphere.current );

      let _texture = new THREE.TextureLoader().load('/assets/img/img_00001.png', _texture =>{
        img.current = new PlaneImage( _texture )
        reunion.current.add( img.current )

        img.current.position.x = 240
      })

      //  中に引っ掛ける
      reunion.current.time.on('tick', ()=>{

        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;

        sphere.current.rotation.x -= 0.01;
        sphere.current.rotation.y += 0.01;

      });

    }

    return ()=>{
      //  dispose
      console.log('ArtWorks.dispose');

      img.current.material.map.dispose()

      reunion.current.remove( mesh.current );
      reunion.current.remove( sphere.current );

      reunion.current?.dispose();
      reunion.current = null;

      if( updatekey.current )
        {
          window.cancelAnimationFrame( updatekey.current );
          updatekey.current = null;
        }
    }

  },[])


  useEffect(()=>{

    console.log( location.pathname );

    gsap.to( sphere.current.material.color, {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
      duration: 2.0,
      ease: 'expo.inOut',
    });

  },[location.pathname]);

  


  return (
    <>
      <canvas className="webglview" ref={myCanvas}></canvas>
    </>
  )
}
export default ArtWorks
