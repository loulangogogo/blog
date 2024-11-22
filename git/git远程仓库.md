# git remote

> **git remote -v**
>
> 会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。

```shell
% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)
```



> **git remote add <shortname> <url>** 
>
> 添加一个新的远程 Git 仓库，同时指定一个方便使用的简写：

```shell
% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)

% git remote add test http://gitlab.dsknykj.cn/loulan/test.git

% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)
test  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
test  http://gitlab.dsknykj.cn/loulan/test.git (push)
```



> **git remote rename `<oldShortname>` `<newShortname>`**
>
> 修改远程仓库的简写名称

```shell
% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)
test  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
test  http://gitlab.dsknykj.cn/loulan/test.git (push)

% git remote rename test tt
Renaming remote references: 100% (1/1), done.

% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)
tt  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
tt  http://gitlab.dsknykj.cn/loulan/test.git (push)
```



> **git remote rm `<shortname>`**
>
> 移除某个远程仓库

```shell
% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)
tt  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
tt  http://gitlab.dsknykj.cn/loulan/test.git (push)

% git remote rm tt

% git remote -v
origin  http://gitlab.dsknykj.cn/loulan/test.git (fetch)
origin  http://gitlab.dsknykj.cn/loulan/test.git (push)
```



> **git remote show <remote>**
>
> 它同样会列出远程仓库的 URL 与跟踪分支的信息。 这些信息非常有用，它告诉你正处于 master 分支，并且如果运行 git pull， 就会抓取所有的远程引用，然后将远程 master 分支合并到本地 master 分支。 它也会列出拉取到的所有远程引用。

```shell
% git remote show origin
* remote origin
  Fetch URL: http://gitlab.dsknykj.cn/loulan/test.git
  Push  URL: http://gitlab.dsknykj.cn/loulan/test.git
  HEAD branch: main
  Remote branch:
    main tracked
  Local branch configured for 'git pull':
    main merges with remote main
  Local ref configured for 'git push':
    main pushes to main (up to date)
```



# git fetch

> **git fetch `<remote>`**
>
> 这个命令会访问远程仓库，从中拉取所有你还没有的数据。
>
> 必须注意 git fetch 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作（ git pull ）。

```shell
% git fetch origin main
From http://gitlab.dsknykj.cn/loulan/test
 * branch            main       -> FETCH_HEAD
```

#### 常见用法（推荐使用）

```shell
git fetch origin
git diff origin/main   # 查看远程和本地分支的差异
git merge origin/main  # 决定是否合并
```







# git pull

> **git pull `<remote>`**
>
> 这个命令访问远程仓库，并拉去远程仓库数据与本地仓库比较**合并、变基或快速前进**。

**合并、变基还是快速前进是需要进行提前配置的，如果没有配置，那么当前执行 git pull就回出现如下的错误：**

```shell
loulan@loulandeMacBook-Pro-2 study-ts % git pull
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint: 
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint: 
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
```

可以看到，提示中给出了三种解决方案：

> 将远程分支的更改与本地分支合并，保留分支的合并历史。
>
> git config pull.rebase false 



> 将本地更改应用到远程分支的最新提交之上，保持历史线性。
>
> git config pull.rebase true



> 只在没有分歧时拉取更新。如果有分歧，将报错。
>
> git config pull.ff only

**一般情况下，我们都需要保持代码变动的历史记录，所以大部分时候我们都选择的是 git config pull.rebase false .**



#### 常见用法

```shell
git pull origin main
```







# git push

> **git push <remote> <branch>**
>
> 当你想要将 master 分支推送到 origin 服务器时， 那么运行这个命令就可以将你所做的备份到服务器

```shell
% echo "hello" > test.txt

% git add test.txt

% git status -s
A  test.txt

% git commit -m "测试"
[main f0d33d0] 测试
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt

% git push origin main
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 280 bytes | 280.00 KiB/s, done.
```