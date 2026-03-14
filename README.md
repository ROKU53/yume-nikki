# 夢日記 — Dream Journal

AIで夢を分析・記録するWebアプリです。

## ファイル構成

```
yume-nikki/
├── public/
│   └── index.html       ← アプリ本体（UI）
├── api/
│   └── chat.js          ← バックエンド（APIキーをここで管理）
├── vercel.json          ← Vercel設定
└── README.md
```

---

## デプロイ手順（Vercel）

### 1. GitHubにアップロード
1. [github.com](https://github.com) でアカウント作成（無料）
2. 「New repository」でリポジトリを作成（名前は `yume-nikki` など）
3. このフォルダの中身をすべてアップロード

### 2. Vercelと連携
1. [vercel.com](https://vercel.com) にGitHubアカウントでログイン
2. 「Add New Project」→ 作成したGitHubリポジトリを選択
3. 「Deploy」をクリック（設定変更不要）

### 3. APIキーを登録（重要）
1. Vercelのプロジェクトページ → 「Settings」→「Environment Variables」
2. 以下を追加：
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: `sk-ant-xxxxxxxxx`（取得したAPIキー）
3. 「Save」→ 「Deployments」→ 「Redeploy」

### 4. 完成！
Vercelが発行したURL（例：`https://yume-nikki.vercel.app`）でアクセスできます。

---

## 注意事項
- APIキーは絶対に `index.html` や GitHubに直接書かないこと
- Vercelの環境変数として登録することで安全に管理できます
- 利用料金はAnthropicの従量課金（1診断あたり数円程度）
