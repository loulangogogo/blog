# @RequiredArgsConstructor

## 概述

> @RequiredArgsConstructor 是 Lombok 提供的注解，用于根据类中声明的**final字段**和**带有@NonNull注解的字段**自动生成一个**必要参数的构造方法**。
>
> - 生成的构造方法包含所有 final 修饰的字段和带有 @NonNull 注解的字段作为参数。
>
> - 不包括未加 final 或 @NonNull 的字段。

## 用法

```java
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class User {
    private final String name;
    private final int age;
    private String address; // 非 final，不会被包含
}

===
  
public class User {
    private final String name;
    private final int age;
    private String address;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```



## 属性

### 一、staticName

> **[@AllArgsConstructor](./@AllArgsConstructor.md) ==> staticName**

### 二、onConstructor

> **[@AllArgsConstructor](./@AllArgsConstructor.md) ==> onConstructor**

### 三、access

> **[@AllArgsConstructor](./@AllArgsConstructor.md) ==> access**
