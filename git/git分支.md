# 分支的创建

### 分支的查看

> **git branch**
>
> 查看分支列表
>
> **git branch -l `<分支通配符>`**
>
> 查看符合通配符的分支

```shell
% git branch
  main
* main-0.1
# * 表示当前分支
% git branch -l "main-*"
* main-0.1
```

---

> **git branch -v**
>
> 查看每个分支最后一次提交

```shell
% git branch -v
  main     f0d33d0 测试
* main-0.1 f0d33d0 测试
```

---

> **git branch --merged**
>
> 查看已经和当前分支合并的分支
>
> **git branch --no-merged**
>
>  查看和当前分支没有合并的分支

```shell
% git branch --merged
* main
  main-0.2

% git branch --no-merged
  main-0.1
```

### 分支的新建

> **git branch `<branchName>`**
>
> 新建一个分支

```shell
% git branch new-0

% git branch
* main
  main-0.1
  main-0.2
  new-0
```

---

> **git checkout -b `<branchName>`**
>
> 新建一个分支并切换为当前分支

```shell
% git checkout -b new-1
Switched to a new branch 'new-1'
# 这个命令相当于 git branch new-1 ; git checkout new-1

% git branch
  main
  main-0.1
  main-0.2
  new-0
* new-1
```

> **git checkout --orphan <new-branch-name>**
>
> 创建了一个没有历史记录的孤儿分支【就是一个单独的分支，没有任何提交记录】

```shell
% git checkout --orphan new-2
Switched to a new branch 'new-2'

% git branch
  main
  main-0.1
  main-0.2
  new-0
  new-1
* new-2
```



### * 分支切换

> **git checkout `<branchName>`**
>
> 切换当前分支为指定的分支

```shell
% git checkout new-0
Switched to branch 'new-0'

% git branch
  main
  main-0.1
  main-0.2
* new-0
  new-1
```



### 分支合并

> **git merge `<branchName>`**
>
> 将指定分支的代码合并到当前分支

```shell
% echo "ok" > ok.txt

% git status -s
?? ok.txt

% git add ok.txt

% git status -s
A  ok.txt

% git commit -m "ok提交测试"
[new-0 bba27d2] ok提交测试
 1 file changed, 1 insertion(+)
 create mode 100644 ok.txt

% git branch -l "new-*" -v
* new-0 bba27d2 ok提交测试
  new-1 fc49a85 test测试

% git checkout new-1
Switched to branch 'new-1'

# 将 new-0 的代码合并到 new-1
% git merge new-0
Updating fc49a85..bba27d2
Fast-forward
 ok.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 ok.txt

% git branch -l "new-*" -v
  new-0 bba27d2 ok提交测试
* new-1 bba27d2 ok提交测试
```

### 分支删除

> **git branch -d `<branch>`**
>
> **本地**删除指定的分支。
>
> 
>
> **git branch -D `<branch>`**
>
> **本地**强制删除指定分支。(如果分支存在未合并的工作，使用 -d 会删除失败)

```shell
% git branch -d new-0
error: The branch 'new-0' is not fully merged.
If you are sure you want to delete it, run 'git branch -D new-0'.

% git branch -D new-0
Deleted branch new-0 (was e038d16).

% git branch -l "new-*"   
* new-1

```



# 远程分支

**本地分支和远程分支之间是没有任何关系的。也就说，你在本地创建的分支即使提交到远程创建，他们两个之间也是没有直接的关联关系的（远程的修改是无法直接拉取到本地分支的）。所以我们需要建立本地和远程分支的跟踪关系，使远程分支成为本地分支的上游分支。**



### 查看本地分支和远程分支的关系

> **git branch -vv**
>
> 会将所有的本地分支列出来并且包含更多的信息，如每一个分支正在跟踪哪个远程分支与本地分支是否是领先、落后或是都有。

```shell
% git branch -vv
  main     fc49a85 [origin/main] test测试
* main-0.1 23f832f [origin/main-0.1] asdf
  master   ba13d80 hello
  test3    ba13d80 [origin/test3: ahead 1] hello
  
# main 分支正在跟踪的是 origin/main 的远程分支
# test3 本地分支跟踪的是 origin/test3 的远程分支 ， ahead 1 表示有1个提交没有推送的远程
# master 本地分支没有跟踪任何远程分支，所以这个无法拉取代码，也无法直接push推送
```



### 分支上游关系建立

> **git branch -u `<remote>/<branch>`**
>
> 将本地当前分支与上游分支建立跟踪关系

```shell
% git branch -l "master" -vv
* master ba13d80 hello

% git branch -u origin/master
branch 'master' set up to track 'origin/master'.

% git branch -l "master" -vv 
* master ba13d80 [origin/master] hello
```





### 分支提交远程

> **git push `<remote>` `<branch>`**
>
> 将分支推送到远程管理
>
> **如果分支在远程不存在，那么必须制定远程和分支名称**

```shell
% git push origin new-0
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 8 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 987 bytes | 987.00 KiB/s, done.
Total 12 (delta 4), reused 0 (delta 0), pack-reused 0
```



### 分支远程检出

> **git checkout -b `<branch>` `<remote>`/`<branch>`**
>
> **git checkout --track  `<remote>`/`<branch>`**
>
> 从远程检出分支到本地。（第一种方式可以给远程分支在本地设置不同的名字）
>
> **这种方式的检出，会直接建立跟踪关系**

**其实就是本地创建一个分支然后跟踪远程分支（从第一个命令也可以看出来）。**

```shell
 % git branch
  main
  main-0.1
* master
  test3

% git checkout --track origin/test
branch 'test' set up to track 'origin/test'.
Switched to a new branch 'test'

% git branch
  main
  main-0.1
  master
* test
  test3
```





### 分支远程删除



> **git push `<remote>` --delete `<branch>`**
>
> 删除**远程**分支

```shell
% git push origin --delete new-0
remote: 
To ssh://gitlab.dsknykj.cn:2222/loulan/test.git
 - [deleted]         new-0
```



### 拉取

> **git pull**
>
> 如果本地分支已经设置好跟踪分支，那么该命令会查找跟踪分支的远程服务器数据，然后尝试合并到本地分支当中。

```shell
% ls
README.md	hello.txt	test.json	test.txt

% git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (5/5), 645 bytes | 129.00 KiB/s, done.
From ssh://gitlab.dsknykj.cn:2222/loulan/test
   ba13d80..e680280  test       -> origin/test
Updating ba13d80..e680280
Fast-forward
 hello.txt | 1 -
 test.json | 1 -
 test.txt  | 1 -
 3 files changed, 3 deletions(-)
 delete mode 100644 hello.txt
 delete mode 100644 test.json
 delete mode 100644 test.txt

% ls
README.md
```

**当 git fetch 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。 它只会获取数据然后让你自己合并。 然而，有一个命令叫作 git pull 在大多数情况下它的含义是一个 git fetch 紧接着一个 git merge 命令。 如果有一个像之前章节中演示的设置好的跟踪分支，不管它是显式地设置还是通过 clone 或 checkout 命令为你创建的，git pull 都会查找当前分支所跟踪的服务器与分支， 从服务器上抓取数据然后尝试合并入那个远程分支。**

**由于 git pull 的魔法经常令人困惑所以通常单独显式地使用 fetch 与 merge 命令会更好一些。**