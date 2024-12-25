# @Target

## 概述

在 Java 中，@Target 是一个元注解，用于指定自定义注解可以应用的 **目标元素** 类型。它来自 java.lang.annotation 包，是注解定义中的一个关键组件。

- **限定注解的使用范围**：通过 @Target，可以明确地定义注解只能应用于类、方法、字段、构造函数等，避免误用。
- **增强代码的可读性和安全性**：通过限制注解的目标类型，可以减少潜在的错误并帮助开发者理解注解的意图。



## 用法

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

// 自定义注解只能用于方法
@Target(ElementType.METHOD)
public @interface MyMethodAnnotation {
}
```



## 属性

### 一、value

#### (一)、作用

> ElementType[] value(); 是 @Target 注解的一个方法，用于指定目标注解可以应用到的 Java 程序元素。value() 返回一个 ElementType 数组，通过它可以定义多个可应用的程序元素范围。

| **枚举值**        | **描述**                                                 | **适用范围示例**                                             |
| ----------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| `TYPE`            | 适用于类、接口（包括注解类型）或枚举。                   | 类定义、接口定义、注解定义、枚举定义。例如：`@Target(ElementType.TYPE)` |
| `FIELD`           | 适用于类的字段（包括枚举常量）。                         | 成员变量、静态变量。例如：`private @CustomAnnotation int count;` |
| `METHOD`          | 适用于方法。                                             | 成员方法或接口方法。例如：`@Override`                        |
| `PARAMETER`       | 适用于方法或构造函数的参数。                             | 方法参数。例如：`public void process(@CustomAnnotation String input)` |
| `CONSTRUCTOR`     | 适用于构造函数。                                         | 类的构造器。例如：`public MyClass(@CustomAnnotation int value) {}` |
| `LOCAL_VARIABLE`  | 适用于局部变量（方法内声明的变量）。                     | 局部变量。例如：`@CustomAnnotation int localVariable = 10;`  |
| `ANNOTATION_TYPE` | 适用于注解类型本身，用于定义可以应用于其他注解的元注解。 | 注解定义。例如：`@Target(ElementType.ANNOTATION_TYPE)`       |
| `PACKAGE`         | 适用于包声明。                                           | 包注解。例如：`@CustomAnnotation package com.example;`       |
| `TYPE_PARAMETER`  | 适用于泛型类型参数（Java 8 引入）。                      | 泛型参数。例如：`class Example<@CustomAnnotation T> {}`      |
| `TYPE_USE`        | 适用于任何使用类型的地方（Java 8 引入）。                | 类型声明、强制转换、泛型、数组、异常声明等。例如：`@NonNull String name; List<@NonNull String>` |

#### (二)、用法

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD})
public @interface MyAnnotation {
}
```

