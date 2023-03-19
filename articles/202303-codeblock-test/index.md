---
title: codeblock test
create: '2023-03-16'
update:
tags: [test]
image:
description: テスト
published: false
---

## langs

### js

```js:index.js
function hello (){
  console.log('hello')
}
```

### tsx

```tsx:index.tsx
export const Counter: FC = () => {
  console.log("hoge")
  const [value, setValue] = useState(0)
  const handleClick = useCallback(() => {
    setValue(prev => prev + 1)
  }, [])

  return (
    <>
      <button type="button" onClick={handleClick}>button</button>
      <p>{value}</p>
    </>
  )
}
```

## python

```python
print("This doesn't get linted either.")
```

![image](../images/1679041126.png)
