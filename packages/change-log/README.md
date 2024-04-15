## ChangeLog document Write Rules

- Unified Feature Icon:

```
🐞：Fixes
🎁：News
♻️: Refactor
🕹：Experimental
🌐： Language
🌱：Seed
🗑️：Deprecated
🔧：Config
🚀：Release
🔖: Publish
```

### Supported syntax Follows:

1.  Version and time must use secondary symbols.

- Such as `##`：

  ```md
  ## V1.3.3 (2024.4.1)
  ```

2.  Feature descriptions must use third-level symbols.

- Such as `###`:

  ```md
  ### 🐞 Fixes
  ```

3.  Changes can be made using `\*` or `-`, but must be in the sub-item under the property heading.

- Such as:

  ```md
  - Adapt to the style of the small screen (ipad)
    - The answer tip page is displayed in the center of the screen
  ```

4.  At most, one indentation is supported before the subproject。

- Such as:

  ```md
  <!-- right syntax: -->

  - Adapt to the style of the small screen (ipad)
    - The answer tip page is displayed in the center of the screen
    - The answer tip page is displayed in the center of the screen
    - The answer tip page is displayed in the center of the screen

  <!-- error syntax -->

  - Adapt to the style of the small screen (ipad)
    - The answer tip page is displayed in the center of the screen
    - The answer tip page is displayed in the center of the screen
      `- The answer tip page is displayed in the center of the screen` `(Current indent layer not supported)`
  ```

5.  Picture or video rules to be supported.

- Such as:

```md
- Leader board Added Week/Month/Total [author1](https://github.com/cuixueshe/earthworm/commit/6ad0552178490fe0f50a6a881d5fa608652e5faf)
  <!-- image -->
  ![imgTitle](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/12688b4fd738/cover.jpg)

  <!-- video pending-->
```

### ChangeLog Template:

```md
<!-- one change: -->

## V1.0.1 (2024.4.1)

### 🎁 News

- Leader board Added Week/Month/Total [author1](https://github.com/cuixueshe/earthworm/commit/6ad0552178490fe0f50a6a881d5fa608652e5faf)
  <!-- ![imgTitle](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/12688b4fd738/cover.jpg) -->
- Optimize the way answers are displayed [author1](https://github.com/cuixueshe/earthworm/commit/6ad0552178490fe0f50a6a881d5fa608652e5faf)
  - Change the overall answer display length
  - Answer three times automatically pop up the answer tip page

### 🐞 Fixes

- Adapt to the style of the small screen (ipad)
  - The answer tip page is displayed in the center of the screen
```
