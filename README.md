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
