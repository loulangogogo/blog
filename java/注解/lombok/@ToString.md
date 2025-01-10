# @ToString

## 概述

@ToString 是 Lombok 提供的注解，用于自动为类生成 toString() **方法**。

生成的 toString() 方法会返回一个包含类名和字段信息的字符串表示，帮助简化代码。

1. **自动生成** toString() **方法**，包括类的字段及其值。

2. **支持自定义字段包含规则**。

3. **支持忽略特定字段、调用父类的** toString() **方法、添加自定义前缀/后缀等功能**。



## 用法

```java
import lombok.ToString;

@ToString
public class User {
    private String name;
    private int age;
    private String address;
}

===
  
@Override
public String toString() {
    return "User(name=" + this.name + ", age=" + this.age + ", address=" + this.address + ")";
}
```





## 属性

### 一、includeFieldNames

#### (一)、作用

> boolean includeFieldNames() default true; 是 Lombok 的 @ToString 注解中的一个参数，用于控制生成的 toString() 方法中是否包含字段的名称。
>
> - includeFieldNames = true**（默认值）：**
>
> 在生成的 toString() 方法中，输出字段名称和字段值。
>
> - includeFieldNames = false**：**
>
> 在生成的 toString() 方法中，只输出字段值，而不显示字段名称。

#### (二)、用法

```java
import lombok.ToString;

@ToString(includeFieldNames = false)
public class User {
    private String name;
    private int age;
}

===
  
@Override
public String toString() {
    return "User(" + this.name + ", " + this.age + ")";
}
```

### 二、exclude

> **[@EqualsAndHashCode](./@EqualsAndHashCode.md) ==> exclude**

### 二、of

> **[@EqualsAndHashCode](./@EqualsAndHashCode.md) ==> of**

### 二、callSuper

> **[@EqualsAndHashCode](./@EqualsAndHashCode.md) ==> callSuper**

### 二、doNotUseGetters

> **[@EqualsAndHashCode](./@EqualsAndHashCode.md) ==> doNotUseGetters**

### 二、onlyExplicitlyIncluded

> **[@EqualsAndHashCode](./@EqualsAndHashCode.md) ==> onlyExplicitlyIncluded**
