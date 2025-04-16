import { useState } from 'react'

function Web() {
  
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h1>Web</h1>
      <p>contents area.</p>
      <p>webで調べたこと書き殴る</p>

      <p>思ったこと: このフォーマットはVite+React でルーティングも正直出し分けの印象。大量ページには向かないので生成8-10ページを上限に考える。それ以上から2-30ページならNuxt、それ以上ならGulpとか？プライベート開発なので基本はReactでおk。</p>

      <p>Sample Code</p>
      <pre><code>npm create vite@latest</code></pre>

      <p>コアクラスは全てJSで記述。プロジェクトごとの固有要素についてはTSを推奨。という基準で今後展開。</p>
      <ul>
        <li>libs core: JS</li>
        <li>libs hoge: TS or JS</li>
        <li>pages: TSX</li>
        <li>components: TSX</li>
      </ul>

    </>
  )
}

export default Web
