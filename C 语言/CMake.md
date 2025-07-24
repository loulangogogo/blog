# 基本概念

### 一、程序文件

- CMakeLists.txt
- xxx.cmake



### 二、注释

##### 单行注释

```cmake
#这个就是单行注释
message(狗日的)
```

##### 多行注释

```cmake
#[[这个就是
多行注释]]
message(狗日的 #[[这个是注释]] 哈哈哈)
```



## 程序命令

### 一、命令参数

> 命令参数一共有三种类型：
>
> - 引号参数(quoted argument)；
> - 非引号参数(unquoted argument)；
> - 括号参数(bracket argument)

#### (一)、引号参数

> [!IMPORTANT]
>
> 引号参数是用引号包裹在内的参数，而且CMake规定它必须使用 双引号。

```cmake
#引号参数中不仅能包含空格，而且可以包含换行符
message("测试空格 和
回车")

#可以使用反斜杠来避免换行
message("测试空格 和\
回车")
```

```shell
loulan@loulandeMacBook-Pro F3 % cmake -P 3.4.1.cmake
测试空格 和
回车
测试空格 和回车
```

#### (二)、非引号参数

> [!IMPORTANT]
>
> 飞引号参数是未被引号包裹的参数。不能包含特殊字符，除非经过转义。

```cmake
message(狗日的)
#空格不会产生影响，无效果
message(狗 日   的)
#分好是cmake列表的一种特殊字符串
message(狗;日;的)
```

```shell
loulan@loulandeMacBook-Pro F3 % cmake -P 3.4.2.cmake
狗日的
狗日的
狗日的
```

#### (三)、变量引用

> [!IMPORTANT]
>
> CMake变量引用形式为 ${变量}

```cmake
set(var_a  狗)
set(var_b 日的)
message(${var_a}${var_b})
```

```shell
loulan@loulandeMacBook-Pro F3 % cmake -P 3.4.3.cmake
狗日的
```

#### (四)、转义字符

```cmake
set("a?b" "变量a?b")
#如果反斜杠后面跟随的不是字母、数字或分号，转义的结果就是该字符本身。
message("${a\?b}")
message("狗日的\?")

# \t \r \n 分别代表的是tab符号，回车符，换行符。
message("\t狗\r日\n的")
```

```shell
loulan@loulandeMacBook-Pro F3 % cmake -P 3.4.4.cmake
变量a?b
狗日的?
日      狗
的
```

#### (五)、括号参数

> [!IMPORTANT]
>
> CMake 的括号参数会作为一个整体船体给命令。它不处理文本中的任何特殊字符（包括转义字符）或变量引用预发，直接保留原始的文本。

```cmake
message([===[这个是一\?\n段用
\r来测${sdf}试话语]===])
```

```shell
loulan@loulandeMacBook-Pro F3 % cmake -P 3.4.5.cmake
这个是一\?\n段用
\r来测${sdf}试话语
```



### 二、变量

#### (一)、普通变量

> set(`<变量>` `<值>`... [PARENT_SCOPE])

- 变量值可以由若干参数来提供，这些参数会被分号分隔连接成一个列表的形式。
- PARENT_SCOPE将变量定义到父作用域中

```cmake
function(f)
    # 由于这个使用了 PARENT_SCOPE，所以可以在外部直接访问到（上一级）
    set(testX "666" PARENT_SCOPE)
    # 这个变量只在当前作用域有效
    set(testY "777")
endfunction()


set(test 1 2 3 4)
message(${test})
set(test xyz)
message(${test})
f()
message(${testX})
message(${testY})

```

```cmd
loulan@loulandeMacBook-Pro F3.5 % cmake -P F3.5.2.1.cmake
1234
xyz
666
CMake Error at F3.5.2.1.cmake:13 (message):
  message called with incorrect number of arguments
```

#### (二)、缓冲变量

#### (三)、环境变量

