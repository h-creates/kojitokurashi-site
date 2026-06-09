# 麹とくらし — プロフィールサイト（ポートフォリオ作品）

発酵ごはん講師・食育アドバイザー「小森 由紀子」を想定した、**架空の個人プロフィールサイト**です。
ポートフォリオ用の制作物であり、登場する人物・連絡先・SNSはすべてダミーです。

静的サイト（HTML / CSS / Vanilla JS）で、ビルド不要・依存パッケージなしで動作します。

## 構成

```
index.html              … 1ページ完結のサイト本体
assets/
  css/style.css         … スタイル
  js/main.js            … スライダー・スクロール演出・メニュー
public/
  favicon-*.png         … ファビコン
  images/opt/           … 最適化済み画像（WebP / 透過PNG）
robots.txt / sitemap.xml
```

## ローカル確認

任意の静的サーバーで開いてください（相対パス・WebP のため `file://` 直開きより HTTP 推奨）。

```bash
npx serve        # または  python3 -m http.server
```

## Cloudflare Pages へのデプロイ

1. このリポジトリを GitHub に push
2. Cloudflare Pages で「Connect to Git」→ 本リポジトリを選択
3. ビルド設定：**Framework preset = None / Build command = （空）/ Build output directory = `/`**
4. デプロイ

## 公開ドメインの差し替え

SEO 用に、以下のファイル内の `https://kojitokurashi.pages.dev` を**実際の公開URL**に置き換えてください。

- `index.html`（canonical / og:url / og:image / twitter:image / JSON-LD）
- `robots.txt`（Sitemap）
- `sitemap.xml`（loc）

## メモ

- 外部リンク（SNS・お問い合わせ）はダミーのため、クリックしても遷移しません（`a[data-demo]`）。
- 連絡先メールアドレスはコードに記載していません。
