---
title: CSSライブラリを goober から TailwindCSS に移行した
create: "2022-11-17"
tags: [nextjs, typescript, tailwindcss]
description: "app dir を使用した Next.js v13 下での Client Components では CSS in JS が非対応だったので、goober から TailwindCSS に変更しました"
published: true
---

ベータ機能であるNext.js v13 `app` dirを適用させようとした際に、ドキュメントにCSS in JSがServer Components (SC)で非対応という事を見落として、下画像の様なgoober関連のエラーに遭遇した。

![image](https://i.imgur.com/MVNxSFg.png)

> Warning: CSS-in-JS is currently not supported in Server Components.
> > [Styling: CSS-in-JS | Next.js](https://beta.nextjs.org/docs/styling/css-in-js)

ただし、`styled-jsx` と `styled-components` は `use client` と明記して適切な処理を加えればClient Components (以下CC)で動くとも書いてある。CSSはすべてのページに渡っている以上は、すべてのページがCCで動作するという事になり、それではNext.js app dirを試す理由がなくなるので、TailwindCSSに移行することにした。

同様の処理でgooberやその他の明記されていないCSS in JSライブラリが動くかどうは別レポジトリで試したい。

## goober

※メモ書き

- src/styles/goober.js
  - [blog.oriverk.dev/goober.js at archive/next12-ts-goober · oriverk/blog.oriverk.dev](https://github.com/oriverk/blog.oriverk.dev/blob/archive/next12-ts-goober/src/styles/goober.js)
- src/pages/_app.tsx
  - [blog.oriverk.dev/_app.tsx at archive/next12-ts-goober · oriverk/blog.oriverk.dev](https://github.com/oriverk/blog.oriverk.dev/blob/archive/next12-ts-goober/pages/_app.tsx)
- src/pages/_document.tsx
  - [blog.oriverk.dev/_document.tsx at archive/next12-ts-goober · oriverk/blog.oriverk.dev](https://github.com/oriverk/blog.oriverk.dev/blob/archive/next12-ts-goober/pages/_document.tsx)
- src/components/markdown/codeblock/copy-button.tsx
  - [blog.oriverk.dev/copy-button.tsx at archive/next12-ts-goober · oriverk/blog.oriverk.dev](https://github.com/oriverk/blog.oriverk.dev/blob/archive/next12-ts-goober/src/components/markdown/codeblock/copy-button.tsx)

### コード

goober使用下ではこんな感じになっていた。Next.js v13 `app` dirではv12までの `_app.tsx` や `_document.tsx` が非対応なので、エラーを起こして当然ではある。

- [oriverk/blog.oriverk.dev at archive/next12-ts-goober](https://github.com/oriverk/blog.oriverk.dev/tree/archive/next12-ts-goober)

<details>

<summary>src/styles/goober.js</summary>

```javascript:src/styles/goober.js
import { createGlobalStyles } from 'goober/global'

export const GlobalStyles = createGlobalStyles`
  :root {
    --color-miku: #00e1ee;
  }`
```

</details>

<details>

<summary>src/pages/_app.tsx</summary>

```javascript:src/styles/_app.tsx
import { setup } from 'goober'

setup(React.createElement, prefix)

export default function MyApp({ Component, pageProps}: AppProps) {
  return (
    <>
      <Head />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
```

</details>

<details>

<summary>src/pages/_document.tsx</summary>

```javascript:src/pages/_document.tsx
import { extractCss } from "goober"

export default class MyDocument extends Document<{ css: string }> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const page = await renderPage()
    // Extrach the css for each page render
    const css = extractCss()
    return { ...page, css }
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id={'_goober'}
            // And defined it in here
            dangerouslySetInnerHTML={{ __html: ' ' + this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

</details>

<details>

<summary>src/components/markdown/codeblock/copy-button.tsx</summary>

```javascript:src/components/markdown/codeblock/copy-button.tsx
import { styled } from 'goober'

interface PasssedProps {
  code: string
}

interface Props extends PasssedProps {
  className?: string
}

const Component = ({ className, code }: Props) => (
  <button className={className}>{code}</button>
)

const StyledComponent = styled(Component)`
  background: var(--color-miku);
  font-weight: bold;
  padding: 0.2rem 0.5rem;
`

const ContainerComponent: React.FC<PasssedProps> = (props) => <StyledComponent {...props} />

export const Button = ContainerComponent
```

</details>

## TailwindCSS

基本的に[Install Tailwind CSS with Next.js - Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)に倣って導入した。

```shell
npm i -D tailwindcss postcss autoprefixer
npm i @heroicons/react
npx tailwindcss init -p
```

また、マークダウン箇所は基本的に[@tailwindcss/typography - Tailwind CSS](https://tailwindcss.com/docs/typography-plugin)を利用し、typographyで対応しきれない箇所用のCSSには `SCSS` を利用することにした。

```shell
npm i -D @tailwindcss/typography sass
```

### CSS

```css:/src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-miku: #00e1ee;
  }

  .markdown {
    h2 > a::before {
      /* Safari 用のフォールバック */
      content: '## ';
      /* 読み上げ等に対しては空文字として認識させる */
      content: '## ' / '';
    }
  }
}
```

![markdown list](https://i.imgur.com/Oo6IRT9.png "リスト")

![image](https://i.imgur.com/H7zbAsX.png "タイポグラフィ")

`::before` や `::after` の疑似要素や置換要素 `content` などの使い方は、jxck氏の[blog.jxck.io](https://blog.jxck.io/)を勝手に参考にさせてもらいました。

また、CSSの `:has()`、 `:is()`、 `:not()`といった疑似要素をはじめて使いましたが、結構便利でした。

```css:/src/styles/globals.scss
figure:has(img), :not(figure) > img {
  border: 1px solid gray;
}

:is(figure) > img {
  border: none;
}

figcaption {
  text-align: center;
}
```

#### Prettier for TailwindCSS

TailwindCSS推奨のクラス名に並べ替えるためのPretteirプラグインを利用した。

```shell:terminal
npm i -D prettier prettier-plugin-tailwindcss
```

ESLintやPrettierの他のプラグインなどと違って、こちらは何の設定もなく動いた。

> It works seamlessly with custom Tailwind configurations, and because it’s just a Prettier plugin, it works anywhere Prettier works — including every popular editor and IDE, and of course on the command line.
> > [Automatic Class Sorting with Prettier - Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

## 参照

- [Getting Started | Next.js](https://beta.nextjs.org/docs/getting-started)
- [Styling: CSS-in-JS | Next.js](https://beta.nextjs.org/docs/styling/css-in-js#configuring-css-in-js-in-app)
- [oriverk/blog.oriverk.dev: blog with React + Next.js + TypeScript](https://github.com/oriverk/blog.oriverk.dev)
- [cristianbote/goober: 🥜 goober, a less than 1KB 🎉 css-in-js alternative with a familiar API](https://github.com/cristianbote/goober)
- [Installation - Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Automatic Class Sorting with Prettier - Tailwind CSS](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
- [blog.jxck.io](https://blog.jxck.io/)
  - [Markdown の Table 記法を CSS で実現する | blog.jxck.io](https://blog.jxck.io/entries/2022-03-06/markdown-style-table-css.html#alternative-text)
  - [自作 Markdown プロセッサベースの blog.jxck.io v2 リリース | blog.jxck.io](https://blog.jxck.io/entries/2021-11-30/blog-v2-release.html)
