import { useState } from 'react'

function Ai() {

  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h1>AI</h1>
      <p>contents area.</p>
      <p>aiで調べたこと書き殴る。今年はAI推進担当。大変だこれ。</p>
      <p>今年度はGithubCopilotを使いこなすレクチャとChatGPTの活用に絞って定着させるを徹底していく。下期の後半からやや発展系（実践）で考えたい。</p>

      <p>4/14 ChatGPTのモデルにアップデート入ったらしい。現行最新モデルは4.1だとか。アッデート当日は回線が繋がりにくかったりポンコツになるなどの現象が多数発生してた（体感した）。</p>
      <p>今回のアップデートでプログラム周りの能力が向上したらしい。知らんけど。、</p>
    </>
  )
}

export default Ai
