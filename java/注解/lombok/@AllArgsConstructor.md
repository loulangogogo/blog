# @AllArgsConstructor

## 概述

@AllArgsConstructor 是 Lombok 提供的一个注解，用于自动生成一个包含所有字段的全参数构造方法。这在需要创建对象并一次性初始化所有字段时非常有用。

1. **生成全参数构造器**

   - Lombok 自动为类的所有字段生成一个带参数的构造器。

   - 包括 final 字段和非 final 字段。

   - 不包括静态字段（static）。

2. **支持组合其他 Lombok 注解**
   - 通常与 @Data、@Getter 等注解一起使用，简化数据类开发。



## 用法

```java
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class User {
    private String name;
    private int age;
}
```





## 属性

### 一、staticName

#### (一)、作用

> String staticName() default ""; 是 Lombok 中一些注解的属性（例如 @AllArgsConstructor 和 @RequiredArgsConstructor）的配置选项，用于指定生成静态工厂方法的名称。默认值为空字符串 ""，表示不生成任何静态工厂方法。如果提供了一个非空的名称，Lombok 将生成一个以该名称命名的静态方法，该方法用于替代直接调用构造器的方式。

#### (二)、用法

```java
import lombok.AllArgsConstructor;

@AllArgsConstructor(staticName = "of")
public class User {
    private String name;
    private int age;
}


// 对应生成的类

public class User {
    private String name;
    private int age;

    // 生成的静态工厂方法
    public static User of(String name, int age) {
        return new User(name, age);
    }
}
```



### 二、onConstructor

#### (一)、作用

> AnyAnnotation[] onConstructor() default {}; 是 Lombok 中某些注解（如 @Builder 和 @SuperBuilder）提供的一个属性，允许开发者在自动生成的构造器上添加自定义注解。
>
> 1. **自定义构造器注解**
>
> - 使用该属性可以为 Lombok 生成的构造器（例如全参构造器）附加额外的注解。
> - 可以为生成的构造器提供特定的元信息或配置。
>
> 2. **默认值**
>
> - 默认值为一个空数组 {}，即不添加任何额外的注解。

#### (二)、用法

```java
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NonNull;

@Builder(onConstructor = @__({@Deprecated}))
@AllArgsConstructor
public class User {
    private String name;
    @NonNull
    private String email;
}

// 生成的如下面的类

@Deprecated
public User(String name, @NonNull String email) {
    this.name = name;
    this.email = email;
}
```



### 三、access

#### (一)、作用

> AccessLevel access() default AccessLevel.PUBLIC; 是 Lombok 中某些注解（如 @Getter、@Setter、@With 等）所提供的一个属性，用于指定生成的方法的访问级别。
>
> | **枚举值**                | **含义**                                     | **示例代码**                 |
> | ------------------------- | -------------------------------------------- | ---------------------------- |
> | `PUBLIC`                  | 方法的访问级别为公共（`public`），是默认值。 | `public void method() {}`    |
> | `PROTECTED`               | 方法的访问级别为受保护（`protected`）。      | `protected void method() {}` |
> | `PACKAGE`（或 `DEFAULT`） | 方法的访问级别为包级私有（无显式修饰符）。   | `void method() {}`           |
> | `PRIVATE`                 | 方法的访问级别为私有（`private`）。          | `private void method() {}`   |
> | `NONE`                    | Lombok 不生成对应的方法。                    | 不生成方法                   |

#### (二)、用法

```java
import lombok.AllArgsConstructor;
import lombok.AccessLevel;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class User {
    private String name;
    private int age;
}
```



