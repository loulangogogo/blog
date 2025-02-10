# @Retention

## 概述

@Retention 是 Java 中的一个元注解，用于指定注解的生命周期（也称为保留策略）。它是 java.lang.annotation.Retention 注解，通常与 @Target 一起使用，用来定义注解的行为方式。

@Retention 决定了注解在不同阶段的保留情况，以及注解是否可以通过反射机制获取。

## 用法

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface RuntimeAnnotation {
    String value() default "Default Value";
}
```



## 属性

### 一、value

#### (一)、作用

> RetentionPolicy value(); 是 @Retention 注解中的一个方法，用于指定注解的生命周期，即它决定了注解的保留策略。这个方法返回一个 RetentionPolicy 枚举值，定义了注解如何与 Java 编译器和 JVM 交互。

| **枚举值**     | **描述**                                                     | **适用场景**                                                 |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `SOURCE`       | 注解仅保留在源代码中，编译器会丢弃，不会出现在 `.class` 文件中。 | 适用于编译时注解处理工具（如 Lombok、静态分析工具），注解仅在源代码层面存在。 |
| `CLASS` (默认) | 注解会保留在 `.class` 文件中，但 JVM 加载类时会忽略，无法通过反射访问。 | 适用于字节码增强工具或在编译后需要访问注解的工具（如 ProGuard、一些编译后处理工具）。 |
| `RUNTIME`      | 注解保留在 `.class` 文件中，JVM 会加载并允许通过反射在运行时读取。 | 适用于需要在运行时读取注解信息的框架（如 Spring、JUnit、依赖注入和 AOP 框架）。 |

#### (二)、用法

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)  // 注解在运行时可以通过反射访问
public @interface MyAnnotation {
    String description() default "Default description";
}
```

