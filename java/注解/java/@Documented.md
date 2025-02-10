# @Documented

## 概述

@Documented 是 Java 中的一个元注解，它用于指示某个注解应该被包含在 Javadoc 文档中。当一个注解使用 @Documented 时，编译器会将这个注解的说明信息包含在生成的 Javadoc 中，这对于文档生成和代码可读性非常重要。

- @Documented 的作用是将应用该注解的类、方法或字段的信息自动添加到 Javadoc 中。
- 如果没有使用 @Documented，该注解的存在不会出现在 Javadoc 文档中，尽管它仍然可以应用到目标元素。

## 用法

```java
import java.lang.annotation.Documented;

@Documented
public @interface MyCustomAnnotation {
    String value() default "Default value";
}
```

