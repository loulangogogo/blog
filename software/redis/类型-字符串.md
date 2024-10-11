* [SET-设置](# SET  key  `value`  [NX | XX])
* [GET-获取](# GET key)
* [GETSET-获取并设置](# GETSET key `new_value`)
* [DEL-删除](# DEL key [key ...])
* [MSET-批量设置](# MSET key `value` [key `value` ...])
* [MSETNX-批量设置不存在的值](# MSETNX key `value` [key `value` ...])
* [MGET-批量获取](# MGET key [key ...])
* [APPEND-追加](# APPEND key `suffix`)
* [STRLEN-获取数据长度](# STRLEN key)
* [GETRANGE-获取指定范围值](# GETRANGE key `start` `end`)
* [SETANGE-设置指定范围值](# SETRANGE key `index` `substitute`)

#### SET  key  `value`  [NX | XX]

**单个设置健值对**

> NX : SET命令只会在键没有值的情况下执行设置操作，并返回OK表示设置成功；如果键已经存在，那么SET命令将放弃执行设置操作，并返回空值null表示设置失败。**(不存在设置)**

> XX : SET命令只会在键没有值的情况下执行设置操作，并返回OK表示设置成功；如果键已经存在，那么SET命令将放弃执行设置操作，并返回空值null表示设置失败。**(存在设置)**

```cmd
> SET test 123456
OK
> SET test1 123 NX
OK
> SET test1 456 NX
null
> SET test2 123 XX
null
> SET test 789 XX
OK
```



#### GET key

**获取指定健值对**

```cmd
> GET test
789
> GET test1
123
> GET test2
null
```



#### GETSET key `new_value`

**获取指定健的值并设置新值**

```cmd
> GETSET a_test 123
null
> GETSET a_test 123
123
> GETSET a_test 456
123
```



#### DEL key [key ...]

**删除指定健值对，可批量删除**

```cmd
> DEL test test1 a_test
3
> GET test
null
> GET test1
null
> GET a_test
null
```



#### MSET key `value` [key `value` ...]

**批量设置健值对**

```cmd
> MSET atest 1 btest 2 ctest 3
OK
> GET atest
1
> GET btest
2
> GET ctest
3
```



#### MSETNX key `value` [key `value` ...]

**批量设置健值对，且只在健值对不存在的情况下设置**

```cmd
> MSETNX atest 7 btest 8 ctest 9 dtest 10
0
> MSETNX dtest 10
1
```





#### MGET key [key ...]

**批量获取健值对**

```cmd
> MGET atest btest
1
2
```



#### APPEND key `suffix`

**追加新值到指定内容的末尾,不存在就直接设置**

```cmd
> APPEND atest 123
3
> GET atest
123
> APPEND atest abc
6
> GET atest
123abc
```



#### STRLEN key

**获取值的长度**

```cmd
> STRLEN atest
1
> STRLEN dtest
2
```



#### GETRANGE key `start` `end`

**获取指定值某个索引范围内的数据**

```cmd
> GET test
123456

# 第一位是 0
> GETRANGE test 2 4
345
```



#### SETRANGE key `index` `substitute`

**替换指定索引的数据为 substitute**

```cmd
> GET test
123456
> SETRANGE test 2 aaa
6
> GET test
12aaa6
```





## 数字类型操作

> 每当用户将一个值存储到字符串键里面的时候，Redis都会对这个值进行检测，如果这个值能够被解释为以下两种类型的其中一种，那么Redis就会把这个值当作数字来处理：
>
> - 第一种类型是能够使用C语言的long long int类型存储的整数，在大多数系统中，这种类型存储的都是64位长度的有符号整数，取值范围介于-9223372036854775808和9223372036854775807之间。
> - 第二种类型是能够使用C语言的long double类型存储的浮点数，在大多数系统中，这种类型存储的都是128位长度的有符号浮点数，取值范围介于3.36210314311209350626e-4932和1.18973149535723176502e+4932L之间

#### INCRBY key `increment`

**对整数值执行加法操作**

```cmd
> get data
20
> INCRBY data 10
30

# 使用负数便是减法
> INCRBY data -5
20
```



#### DECRBY kye `increment`

**对整数值执行减法操作**

```cmd
> get data
30
> DECRBY data 5
25

# 使用负数便是加法
> DECRBY data -5
25
```



#### INCR key

**对整数值进行加 1 操作**

```cmd
> get data
25
> INCR data
26
```



#### DECR key

**对整数值进行减 1 操作**

```cmd
> get data
26
> DECR data
25
```



#### INCRBYFLOAT key `increment`

**对浮点数进行加减法（正数是加，负数是减）**

```cmd
> INCRBYFLOAT data 0.123
25.123
> INCRBYFLOAT data -0.1
25.023
```

