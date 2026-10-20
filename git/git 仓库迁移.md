# Git 镜像仓库迁移

## 1. 通过 clone 命令将仓库镜像下载到本地

```
git clone --mirror 仓库地址
```

例如：

```
git clone --mirror http://gitee.com/test.git
```

## 2. 进入本地镜像仓库

```
cd <仓库名称>
```

例如：

```
cd test.git
```

## 3. 将仓库中的旧的远端地址更改为新仓库地址

```
git remote set-url --push origin 新代码仓库地址
```

例如：

```
git remote set-url --push origin http://gitee.com/demo.git
```

## 4. 将修改后的 Git 镜像仓库推送到新的仓库

```
git push --mirror
```

至此，旧仓库已经完整推送到了新的代码仓库，commit 记录和代码分支完整。

## 总结

```
git clone --mirror http://old.git
git remote set-url --push origin http://new.git
git push --mirror
```