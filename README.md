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

## features

- [Husky - Git hooks](https://typicode.github.io/husky/#/)
- [commitlint - Lint commit messages](https://commitlint.js.org)
