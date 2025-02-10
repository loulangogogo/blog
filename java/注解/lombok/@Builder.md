# @Builder

## 概述

@Builder 是 Lombok 提供的一个注解，用于实现 **建造者模式（Builder Pattern）**。该模式适用于创建复杂对象，尤其是当对象的参数较多且有一些可选字段时，可以避免构造函数参数过多的问题。

**@Builder 的主要特点：**

- **流式接口（Fluent Interface）**：生成的方法允许链式调用，简化对象创建过程。
- **命名方法**：为类的每个字段生成一个 setter 方法，可以按任意顺序设置字段的值。
- **不可变对象**：通常与 final 字段一起使用，生成不可变的对象。



## 用法

```java
import lombok.Builder;

@Builder
public class User {
    private String name;
    private String email;
    private int age;
}

public class Main {
    public static void main(String[] args) {
        User user = User.builder()
                        .name("John Doe")
                        .email("john@example.com")
                        .age(25)
                        .build();
        System.out.println(user);
    }
}
```



## 属性

### 一、builderMethodName

#### (一)、作用

> @Builder 注解的 builderMethodName 属性允许你自定义构建器方法的名称。默认情况下，Lombok 会为你生成一个名为 builder 的方法，用于创建构建器实例。但是，你可以通过设置 builderMethodName 属性来指定一个不同的名称。

#### (二)、用法

```java
import lombok.Builder;

@Builder(builderMethodName = "customBuilder")
public class User {
    private String name;
    private String email;
    private int age;

    public static void main(String[] args) {
        User user = User.customBuilder()
                        .name("John Doe")
                        .email("john@example.com")
                        .age(25)
                        .build();
        System.out.println(user);
    }
}
```





### 二、buildMethodName

#### (一)、作用

> @Builder 注解的 buildMethodName 属性用于自定义构建器类的生成方法的名称，默认方法名称为 build。通过设置 buildMethodName，你可以指定生成的构建器方法名称，以适应项目中不同的命名规范。

#### (二)、用法

```java
import lombok.Builder;

@Builder(buildMethodName = "create")
public class User {
    private String name;
    private String email;
    private int age;

    public static void main(String[] args) {
        User user = User.builder()
                        .name("John Doe")
                        .email("john@example.com")
                        .age(25)
                        .create();  // 使用自定义的 build 方法名称
        System.out.println(user);
    }
}
```



### 三、toBuilder

#### (一)、作用

> Lombok 的 @Builder 注解中，toBuilder 属性用于控制是否为类生成 toBuilder() 方法，这个方法允许基于现有对象生成一个 Builder 实例，并以此创建修改后的对象。默认值为 false，即不会生成 toBuilder() 方法。
>
> - true：生成一个 toBuilder() 方法，可以通过该方法从已有对象生成构建器。
>
> - false**（默认）**：不会生成 toBuilder() 方法。

#### (二)、用法

```java
import lombok.Builder;
import lombok.ToString;

@Builder(toBuilder = true)
@ToString
public class User {
    private String name;
    private String email;
    private int age;

    public static void main(String[] args) {
        // 创建一个 User 对象
        User user = User.builder()
                        .name("Alice")
                        .email("alice@example.com")
                        .age(30)
                        .build();

        System.out.println("原始用户：" + user);

        // 使用 toBuilder 修改 email
        User updatedUser = user.toBuilder()
                               .email("newalice@example.com")
                               .build();

        System.out.println("更新后的用户：" + updatedUser);
    }
}
```



### 四、builderClassName

#### (一)、作用

> 在 Lombok 的 @Builder 注解中，builderClassName 属性用于指定生成的 Builder 类的类名。如果未设置，默认生成的类名为 类名 + Builder。
>
> 

#### (二)、用法

```java
import lombok.Builder;
import lombok.ToString;

@Builder(builderClassName = "UserBuilder")
@ToString
public class User {
    private String name;
    private String email;
    private int age;

    public static void main(String[] args) {
        User.UserBuilder builder = User.builder()
                                       .name("Alice")
                                       .email("alice@example.com")
                                       .age(25);
        User user = builder.build();
        System.out.println(user);
    }
}
```



### 五、access

> **[@AllArgsConstructor](./@AllArgsConstructor.md) ==> access**



### 六、builderMethodName

#### (一)、作用

> 在 Lombok 的 @Builder 注解中，setterPrefix 属性允许你为生成的构建器方法的名称添加一个前缀。默认情况下，setterPrefix 是空字符串 ("")，这意味着 Lombok 会直接使用字段名作为方法名。

#### (二)、用法

```java
import lombok.Builder;
import lombok.ToString;

@Builder(setterPrefix = "with")
@ToString
public class User {
    private String name;
    private String email;
    private int age;

    public static void main(String[] args) {
        User user = User.builder()
                        .withName("Alice")
                        .withEmail("alice@example.com")
                        .withAge(30)
                        .build();

        System.out.println(user);
    }
}
```

