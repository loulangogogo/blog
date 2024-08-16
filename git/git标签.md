# git tag

### 查询标签

> **git tag**
>
> 这个命令以字母顺序列出标签，但是它们显示的顺序并不重要。

> **git tag -l `<通配符*>`**
>
> **git tag --list `<通配符*>`**
>
> 通过使用通配符可以对标签进行筛选展示

```shell
% git tag
v1.0
v1.1
v1.2
v1.3
v1.3.2
v1.4
v1.4.1

% git tag -l "v1.4*"
v1.4
v1.4.1
```



### 新增标签

##### 轻量标签

> **git tag `<tag标签版本>`**

```shell
% git tag x1.0

% git tag
v1.0
v1.1
v1.2
v1.3
v1.3.2
v1.4
v1.4.1
x1.0

% git show x1.0
commit f0d33d004c43b6900cd1e00362802c0a866b6181 (HEAD -> main, tag: x1.0, tag: v1.4.1, tag: v1.4, tag: v1.3.2, tag: v1.3, tag: v1.2, tag: v1.1, tag: v1.0, origin/main, origin/HEAD)
Author: loulan <loulangogogo@163.com>
Date:   Fri Aug 16 10:37:24 2024 +0800

    测试

diff --git a/test.txt b/test.txt
new file mode 100644
index 0000000..ce01362
--- /dev/null
+++ b/test.txt
@@ -0,0 +1 @@
+hello
```



##### 附注标签

> **git tag -a `<tag标签版本>` -m `<信息>`**
>
> -a 表明你使用附注标签。
>
> -m 选项指定了一条将会存储在标签中的信息。 如果没有为附注标签指定一条信息，Git 会启动编辑器要求你输入信息。

```shell
% git tag -a x2.0 -m "ttt-2.0"

% git tag -l 'x*'
x1.0
x2.0

% git show x2.0
tag x2.0
Tagger: loulan <loulangogogo@163.com>
Date:   Fri Aug 16 11:56:41 2024 +0800

ttt-2.0

commit f0d33d004c43b6900cd1e00362802c0a866b6181 (HEAD -> main, tag: x2.0, tag: x1.0, tag: v1.4.1, tag: v1.4, tag: v1.3.2, tag: v1.3, tag: v1.2, tag: v1.1, tag: v1.0, origin/main, origin/HEAD)
Author: loulan <loulangogogo@163.com>
Date:   Fri Aug 16 10:37:24 2024 +0800

    测试

diff --git a/test.txt b/test.txt
new file mode 100644
index 0000000..ce01362
--- /dev/null
+++ b/test.txt
@@ -0,0 +1 @@
+hello
```



### 追加标签

> **git tag -a `<tag标签版本>` `<提交快照校验和或部分校验和>` -m `<信息>`** 
>
> **git tag `<tag标签版本>` `<提交快照校验和或部分校验和>`** 
>
> 追加标签可以在以前提交过的某一个版本上进行打标签。

```shell
% git log --pretty=oneline
f0d33d004c43b6900cd1e00362802c0a866b6181 (HEAD -> main, tag: x2.0, tag: x1.0, tag: v1.4.1, tag: v1.4, tag: v1.3.2, tag: v1.3, tag: v1.2, tag: v1.1, tag: v1.0, origin/main, origin/HEAD) 测试
a90c02cf7e0ffed825ab2fe56dfbdef6977068f1 Update README.md
82340466991356b67856e3a2f48ecfbef6b8e033 Initial commit

% git tag  q1.0 82340466991356b67856e3a2f48ecfbef6b8e033 

% git tag
q1.0
v1.0
v1.1
v1.2
v1.3
v1.3.2
v1.4
v1.4.1
x1.0
x2.0

% git show q1.0
commit 82340466991356b67856e3a2f48ecfbef6b8e033 (tag: q1.0)
Author: 楼兰 <loulangogogo@163.com>
Date:   Fri Aug 16 02:26:56 2024 +0000

    Initial commit

diff --git a/README.md b/README.md
new file mode 100644
index 0000000..c9ef63c
--- /dev/null
+++ b/README.md
```



### 标签推送

> **git push `<remote>` `<tagname>`**
>
> 推送某一个标签到远程

> **git push `<remote>` --tags**
>
> 推送批量标签到远程

```shell
% git push --tags
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 150 bytes | 150.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: =======================================================================
remote: 
remote:    新的分支请从master-0.0.1拉取。重点！重点！重点！
remote: 
remote: =======================================================================
remote: 
To http://gitlab.dsknykj.cn/loulan/test.git
 * [new tag]         q1.0 -> q1.0
 * [new tag]         v1.0 -> v1.0
 * [new tag]         v1.1 -> v1.1
 * [new tag]         v1.2 -> v1.2
 * [new tag]         v1.3 -> v1.3
 * [new tag]         v1.3.2 -> v1.3.2
 * [new tag]         v1.4.1 -> v1.4.1
 * [new tag]         x1.0 -> x1.0
 * [new tag]         x2.0 -> x2.0
```



### 标签删除

##### 本地删除

> **git tag -d `<tagname>`**
>
> 只能删除本地某个版本标签

```shell
% git tag -d v1.0
Deleted tag 'v1.0' (was f0d33d0)
```





##### 远程删除

> **git push origin --delete `<tagname>`**
>
> 只能删除远程某个标签

```shell
% git push origin --delete v1.0
remote: 
remote: =======================================================================
remote: 
remote:    新的分支请从master-0.0.1拉取。重点！重点！重点！
remote: 
remote: =======================================================================
remote: 
To http://gitlab.dsknykj.cn/loulan/test.git
 - [deleted]         v1.0
```



### 检出标签

> **git checkout `<tagname>`**
>
> 检出某个标签

```shell
% ls
README.md	test.txt

% git checkout q1.0
Note: switching to 'q1.0'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 8234046 Initial commit

% ls
README.md

% git status
HEAD detached at q1.0
```



&emsp;&emsp;**该命令检出标签，会使当前仓库处于 “分离头指针（detached HEAD）”的状态，在“分离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化， 但你的新提交将不属于任何分支，并且将无法访问，除非通过确切的提交哈希才能访问。**