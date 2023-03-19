# oriverk-docs

markdown repo for blog.oriverk.dev

## procedure

```bash
npm init
npm i -D @commitlint/{config-conventional,cli} husky
npx husky install
npx husky add .husky/commit-msg 'npx commitlint --edit ${1}'
```

- `feat:`：新機能
- `fix:`：バグフィックス
- `refactor:`：新機能でもバグフィックスでもないコード変更
- `perf:`：パフォーマンス向上
- `test:`：テストコードの追加・修正
- `style:`：コードの意味に影響しない変更（空白、フォーマット、セミコロン）
- `docs:`：ドキュメントだけの変更
- `chore:`：雑用（ビルドプロセスの変更、ツールやライブラリの追加削除）

```bash
npm create @eslint/config
npm install -D eslint-plugin-markdown
npm i -D npm-run-all
npm i -D textlint textlint-rule-eslint textlint-rule-preset-{ja-spacing,ja-technical-writing,smarthr,textlint-rule-spellcheck-tech-word}
npm i -D markdownlint-cli
```

## features

- [Husky - Git hooks](https://typicode.github.io/husky/#/)
- [commitlint - Lint commit messages](https://commitlint.js.org)
- [Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linter](https://eslint.org/)
- [textlint · The pluggable linting tool for text and markdown](https://textlint.github.io/)
- [DavidAnson/markdownlint: A Node.js style checker and lint tool for Markdown/CommonMark files.](https://github.com/DavidAnson/markdownlint)

- [MarkdownのコードブロックをESLintでチェックするtextlintルール | Web Scratch](https://efcl.info/2016/07/06/eslint-with-textlint/)
- [oriverk/zenn-docs: for zenn.dev](https://github.com/oriverk/zenn-docs/tree/main)

- [Visual Studio Code April 2022](https://code.visualstudio.com/updates/v1_67#_languages)
- [Visual Studio CodeがMarkdownのサポートを強化。ファイルのドロップでリンクを自動作成、見出しへの参照一覧など。Visual Studio Code 1.67（April 2022） － Publickey](https://www.publickey1.jp/blog/22/visual_studio_codemarkdownvisual_studio_code_167april_2022.html)
- [Markdown Shortcuts - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mdickin.markdown-shortcuts)
- [sakamoto66/vscode-paste-image: paste image from clipboard to markdown/asciidoc directly!](https://github.com/sakamoto66/vscode-paste-image)
