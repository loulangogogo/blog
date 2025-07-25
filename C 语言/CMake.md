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
- 普通变量的应用语法是 `${...}`

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

> set(`<变量>` `<值>`... CACHE `<变量类型>` `<变量描述>` [FORCE])

- 定义变量和值的时候与设置 **普通变量** 没有区别
- **CACHE** 用来表示这个是一个缓冲变量，缓冲变量具有全局作用域，因此不需要PARENT_SCOPE
- **变量类型** 有5中取值
  - BOOL 布尔型
  - FILEPATH 文件路径类型
  - PATH 目录路径类型
  - STRING 文本类型
  - INTERNAL 内部使用
- **变量描述** 用于给出这个缓冲变量的详细说明
- **FORCE** 用于强制覆盖先前缓冲变量的值。
  - 如果先前变量不存在，那么无论是否有FORCE都会设置成功
  - 如果先前变量存在，那么不设置FORCE那么就会失败
- 缓冲变量的引用语法是 `$CACHE{...}`

```cmake
set(test 123 CACHE STRING "")
# // 因为缓冲变量已经存在，所以不会被覆盖
set(test 456 CACHE STRING "")
message($CACHE{test})

set(test 789 CACHE STRING "" FORCE)
message($CACHE{test})

# 布尔类型可以使用option进行定义，选项是 ON/OFF
# option(<变量> <变量描述> [<ON|OFF>])
option(testBool "test" ON)
message($CACHE{testBool})
```

```cmd
loulan@loulandeMacBook-Pro F3.5 % cmake -P 3.5.2.2.cmake
123
789
ON
```



#### (三)、环境变量

> set(ENV{`<环境变量>` `<值>`})

- 环境变量具有全局作用域，但是不支持多参数列表来定义值
- cmake定义的环境变量只会影响当前的cmake进程，不会影响其他进程和系统环境变量
- 环境变量的应用语法是 `$ENV{...}`

```cmake
# 直接读取系统环境变量
message(JAVA_HOME=$ENV{JAVA_HOME})

# 配置线程环境变量
set(ENV{test} 123)
message(test=$ENV{test})
```

```cmd
loulan@loulandeMacBook-Pro F3.5 % cmake -P 3.5.2.3.cmake
JAVA_HOME=/Users/loulan/.tool/jdk/jdk-17.0.15.jdk/Contents/Home
test=123
```

