# 目录

[git remote](#git remote)

[git fetch](#git fetch)

[git push](#git push)

# 命令

#### git remote

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



#### git fetch

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



#### git push

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