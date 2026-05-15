# 一、什么是 worktree

> git worktree是git提供的一种“多工作目录”机制
>
> - 一个 git 仓库
> - 同时检出多个分支
> - 每个分支拥有独立的工作目录

> worktree = “共享 .git 数据库的多个独立工作区”

> [!CAUTION]
>
> 如果我们调试同一个项目两个分支的代码的时候：
>
> - 通常做法
>   - 将两个分支的代码clone到不同的目录下
>   - 各自调试各自的，互不影响
>   - 各自有各自的 .git 库
> - worktree 做法
>   - 将两个分支的代码 worktree 到不同的目录下
>   - 各自调试各自的，互不影响
>   - 公用同一个 .git 库



# 二、操作命令

## 1. 查看

> git worktree list

```cmd
loulan@loulandeMacBook-Pro dragon % git worktree list
/Users/loulan/Documents/Program/JAVA/MY/dragon   49bf07d [main]
/Users/loulan/Documents/Program/JAVA/MY/dragon2  1d43df7 [2.x]
/Users/loulan/Documents/Program/JAVA/MY/dragon3  49bf07d [test]
```



## 2. 创建

### <1> 提取远程分支

> git worktree add <目录> <分支>

```cmd
loulan@loulandeMacBook-Pro dragon % git worktree add ../dragon2 2.x
Preparing worktree (checking out '2.x')
HEAD is now at 1d43df7 数据库备份

loulan@loulandeMacBook-Pro MY % ls
dragon          dragon2  
```

### <2> 创建新分支

> git worktree add -b <分支名称> <目录>

```cmd
loulan@loulandeMacBook-Pro dragon % git worktree add -b test ../dragon3
Preparing worktree (new branch 'test')
HEAD is now at 49bf07d feat(common): 添加通用Feign客户端接口及实现

loulan@loulandeMacBook-Pro MY % ls
dragon          dragon2         dragon3
```



## 3. 删除worktree

> git worktree remove <目录>
>
> - 删除工作目录
> - 删除worktree注册信息

```cmd
loulan@loulandeMacBook-Pro dragon % git worktree remove ../dragon2
loulan@loulandeMacBook-Pro dragon % git worktree list             
/Users/loulan/Documents/Program/JAVA/MY/dragon   49bf07d [main]
/Users/loulan/Documents/Program/JAVA/MY/dragon3  49bf07d [test]
```



## 4. 清理失效worktree

> 当目录手动删除之后，git认为worktree仍然存在
>
> git worktree prune

```cmd
loulan@loulandeMacBook-Pro dragon % rm -rf ../dragon3/
loulan@loulandeMacBook-Pro dragon % git worktree list
/Users/loulan/Documents/Program/JAVA/MY/dragon   49bf07d [main]
/Users/loulan/Documents/Program/JAVA/MY/dragon3  49bf07d [test] prunable
loulan@loulandeMacBook-Pro dragon % git worktree prune
loulan@loulandeMacBook-Pro dragon % git worktree list 
/Users/loulan/Documents/Program/JAVA/MY/dragon  49bf07d [main]
```



## 5. 修复worktree

> git worktree repair
>
> - worktree损坏
>
> git worktree repair <目录>
>
> - 目录路径

```cmd
loulan@loulandeMacBook-Pro dragon % git worktree list 
/Users/loulan/Documents/Program/JAVA/MY/dragon   49bf07d [main]
/Users/loulan/Documents/Program/JAVA/MY/dragon2  1d43df7 [2.x] prunable

loulan@loulandeMacBook-Pro MY % ls
dragon          dragon3 

loulan@loulandeMacBook-Pro dragon % git worktree repair ../dragon3/
repair: gitdir incorrect: /Users/loulan/Documents/Program/JAVA/MY/dragon/.git/worktrees/dragon2/gitdir
loulan@loulandeMacBook-Pro dragon % git worktree list              
/Users/loulan/Documents/Program/JAVA/MY/dragon   49bf07d [main]
/Users/loulan/Documents/Program/JAVA/MY/dragon3  1d43df7 [2.x]
```

