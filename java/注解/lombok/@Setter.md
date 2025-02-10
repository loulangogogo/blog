# @Setter

## 概述

@Setter 是 Lombok 提供的注解，用于自动为类的字段生成 **setter 方法**。

1. 如果将 @Setter 注解放在类上，则会为该类中所有非静态字段生成 setter 方法。
2. 如果将 @Setter 注解放在某个字段上，则只为该字段生成 setter 方法。



## 用法

```java
import lombok.Setter;

@Setter
public class User {
    private String name;
    private int age;
}

===
  
public class User {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```



## 属性

### 一、value

> **[@Getter](./@Getter.md) ===> value**

### 二、onMethod

> **[@Getter](./@Getter.md) ===> onMethod**

### 三、onParam

> **[@EqualsAndHashCode](./@EqualsAndHashCode.md) ==> onParam**