# 如何提交一个 Pull Request

## 一、找到你想提交 PR的仓库，点击 Fork

![alt text](/contribution/image.png)

## 二、将 Fork后的仓库 Clone 到本地(注意是自己的仓库)

![alt text](/contribution/image-1.png)

## 三、创建一个新的分支用于解决某个问题的 PR提交

- 在此分支进行代码功能更新，可以提交多个commit msg，建议细分功能提交

- 分支名称应该见名知意，比如 feat/xxx、fix/xxX

```bash
git checkout -b feat/add-feature
```

![alt text](/contribution/image-2.png)

> 尽量不要在主分支 main 上做 PR 提交

- 只在 main 分支提交会导致在这个 PR 被合并后，下次 PR时，你的 commit msg 会留存上次 PR 的信息，就不干净了，而创建一个新分支的方式能很好的解决这个问题main 分支主要作用就是同步 Fork前仓库

## 四、将此分支 push 到你的仓库

```bash
git push origin feat/add-feature
```

![alt text](/contribution/image-3.png)

## 五、提交 PR 到原 Fork 仓库指定分支

- 回到 Fork 的仓库时，首页会出现提示，点击Compare &pull request

![alt text](/contribution/image-4.png)

- 来到这个页面将这个 PR 所解决的问题写在 Add adescription 中，并将核心内容概括取一个好一点的 title更有利于维护者来快速了解并 review 你的代码

- 确认好了点击 Create pull request

![alt text](/contribution/image-5.png)

## 六、等待仓库维护者合并 PR

![alt text](/contribution/image-6.png)

## 恭喜你，你已成功提交一个 PR ，太棒啦 🎉
