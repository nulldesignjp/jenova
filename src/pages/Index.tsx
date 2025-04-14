import { useEffect, useState } from 'react'
import { useRef } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

import PseudoWebGL from '../libs/PseudoWebGL'

function App() {
  const [count, setCount] = useState<number>(0);
  const myCanvas = useRef<HTMLCanvasElement>(null);

  let _pseudoWebGL:PseudoWebGL;

  useEffect(()=>{

    console.log( myCanvas.current )

    if( myCanvas.current )
    {
      _pseudoWebGL = new PseudoWebGL({
        canvas: myCanvas.current
      })
    }

    return ()=>{
      //  dispose
      if( _pseudoWebGL )
      {
        _pseudoWebGL.dispose();
        myCanvas.current = null;
      }
    }

  },[])

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
      <h1>Vite + React</h1>
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

      <canvas className="indexwebglview" ref={myCanvas}></canvas>

      <p>contents area.</p>
      <p>普通にテンプレートを触ってお作法学びつつリハビリ（React3ヶ月ぶり）。プロジェクトコードは思いつきの拗らせ。</p>
      <p>ファイルの命名規則考えること。今少し混乱。</p>
      <dl>
        <dt>main.jsx</dt>
        <dd>大元のルート扱い。主にルーディングと諸設定。pages の外にあるのでまだおk</dd>
        <dt><s>index.jsx</s> → _router.jsx</dt>
        <dd><s>ルーティング本体（このファイル名考えたいが・・・）</s>(解決)</dd>
        <dt><s>Home.jsx</s> → index.jsx</dt>
        <dd><s>実際のINDEX.HTMLに相当。index.jsxとHome.jsxで混乱。と言いつつもindex.jsxはpagesに入れといた方がいいのか疑惑。</s>(解決)</dd>
      </dl>
      <p>ルーティングのJSXは_router.jsxとして読み込み。トップはindex.jsxとする。</p>

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
    </>
  )
}

export default App
