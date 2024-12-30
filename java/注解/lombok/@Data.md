# @Data

## 概述

Lombok 的 `@Data` 是一个综合性注解，用于简化 Java Bean 类的开发。它是 **@Getter**、**@Setter**、**@ToString**、**@EqualsAndHashCode** 和 **@RequiredArgsConstructor** 注解的组合，自动生成常用的类方法，从而减少样板代码。



## 用法

```java
import lombok.Data;

@Data
public class User {
    private String name;
    private int age;
    private final String id; // final 字段会被 `@RequiredArgsConstructor` 使用
}

```





## 属性

### 一、staticConstructor

#### (一)、作用

> Lombok 的 `@Data` 注解的 `staticConstructor` 属性允许为类生成一个静态工厂方法，用于替代传统的构造函数调用。它的默认值是空字符串 `""`，表示不生成任何静态工厂方法。如果提供了非空字符串，Lombok 会生成一个静态方法，其名称就是 `staticConstructor` 的值。

#### (二)、用法

```java
@Data(staticConstructor = "of")
public class User {
    private final String name;
    private final int age;
}



User user = User.of("Alice", 25);
```

