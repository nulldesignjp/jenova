import { useEffect, useState, useRef } from 'react'
import { useLocation } from "react-router-dom";

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

import Jenova from '../libs/jenova'
import gsap from 'gsap'
import Wire from '../libs/jenova/core/Wire.js'
import PlaneImage from '../libs/jenova/utils/PlaneImage.js'
import * as THREE from 'three'

function App() {

  const [count, setCount] = useState<number>(0);
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const reunion = useRef<Jenova | null>(null);
  const updatekey = useRef<number>(null);

  const location = useLocation();
  
  /**
   * 全てのようをそ直接入れると管理がめんどくさいので、シーンごとの管理に。
   * Scene[] ? Scene{}
   * 
   */

  const img = useRef<THREE.Mesh | null>(null);
  const mesh = useRef<Wire | null>(null);
  const sphere = useRef<Wire | null>(null);

  const weight = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{

      if( myCanvas.current )
      {
        reunion.current = new Jenova({
          canvas: myCanvas.current
        });

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


        //  ???        
        var _url = 'https://script.google.com/macros/s/AKfycbxQJPSyzcmvXt1CMniXtjJVW0zb1JI_YEbZEMZ5LqHs0IiNFZazJR5e6xYIhGi8xkOk4A/exec'
        const xhr = new XMLHttpRequest();
        xhr.open( 'GET', _url );
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;

            let _ul = document.createElement('ul')
            weight.current.appendChild( _ul )

            for( var i = 0; i < data.length; i+=7 )
            {
              let _li = document.createElement('li');
              let _date = document.createElement('span');
              let _weight = document.createElement('span');
              let _fat = document.createElement('span');
              _li.appendChild( _date );
              _li.appendChild( _weight );
              _li.appendChild( _fat );

              _date.style.marginRight = '20px'
              _weight.style.marginRight = '20px'

              _date.style.fontSize = '2em'
              _weight.style.fontSize = '2em'
              _fat.style.fontSize = '2em'

              let _d = new Date( data[i].Date )
              _date.textContent = _d.getFullYear() + '/' + ( _d.getMonth() + 1 ) + '/' + _d.getDate()
              _weight.textContent = data[i].Weight + 'kg';
              _fat.textContent = data[i].Fat + '%';

              _ul.appendChild(_li)
            }


          } else {
            console.log(`Error: ${xhr.status}`);
          }
        };

      }

    return ()=>{
      //  dispose
      console.log('dispose');

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

  },[location.pathname]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + TypeScript.</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <canvas className="webglview" ref={myCanvas}></canvas>

      <p>contents area.</p>
      <p>ChatGPTベースでの学習はコードお作法学に限定するとクッソ効率がいい。</p>
      <p>Reactのお作法とTSのお作法を混ぜると環境依存型になるので分離して使うこと。TSはほぼAS3なので気にせず描ける。ほとんど忘れてるけど。</p>
      <p>クラス設計周辺のことをざっとできるのは強い。</p>
      <p>...仕事には使わ</p>
      <p><s>ファイルの命名規則考えること。今少し混乱。</s></p>
      <dl>
        <dt>main.jsx</dt>
        <dd>大元のルート扱い。主にルーディングと諸設定。pages の外にあるのでまだおk</dd>
        <dt><s>index.jsx</s> → _router.jsx</dt>
        <dd><s>ルーティング本体（このファイル名考えたいが・・・）</s>(解決)</dd>
        <dt><s>Home.jsx</s> → index.jsx</dt>
        <dd><s>実際のINDEX.HTMLに相当。index.jsxとHome.jsxで混乱。と言いつつもindex.jsxはpagesに入れといた方がいいのか疑惑。</s>(解決)</dd>
      </dl>
      <p>ルーティングのJSXは_router.jsxとして読み込み。トップはindex.jsxとする。(確定)</p>

      <pre><code>CODEはこんな感じ</code></pre>
{/* 
      <pre>```めも: React（お作法編・実践寄り）
技術	具体例	メリット
useRef()	const canvasRef = useRef(null) → ref={canvasRef}	Canvas, DOM取得に最適
useEffect()	初期化コードを useEffect(() → {}, []) に入れる	副作用の管理が明示的に
props / state	表示切り替え・モード管理	表現ロジックとUIを分離
カスタムHook	useSceneAnimation() のようにまとめる	演出ロジックの再利用と見通し◎
React.memo()	動かさなくていいUIの最適化	描画コスト減（特にThree使用時）```
</pre> */}

      <p>ChatGPTの評価から考えると、TS,インフラ周りの知識つけた方が良いらしい（フロント単体で見るとまずTS）。それなしでも上位約5％くらいのスキル。制作スキル伸ばしてもなって気はしてる。</p>

      <p>list</p>
      <ul>
      <li>list01</li>
      <li>list02</li>
      <li>list03</li>
      </ul>
      <ol>
      <li>list01</li>
      <li>list02</li>
      <li>list03</li>
      </ol>

      <p>画像</p>
      <img src="/assets/img/img_00000.jpg" alt="sample image" />

      <div ref={weight}></div>
    </>
  )
}

export default App
