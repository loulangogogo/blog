# @NoArgsConstructor

## 概述

@NoArgsConstructor 是 Lombok 提供的注解，用于自动生成**无参构造方法**。

@NoArgsConstructor 注解会为类生成一个无参数的构造方法（default constructor）。

这个构造方法不会初始化任何字段，仅简单地创建对象。



## 用法

```java
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class User {
    private String name;
    private int age;
}

===
  
public class User {
    private String name;
    private int age;

    public User() {
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

### 四、force

#### (一)、作用

> boolean force() default false; 是 Lombok 的 @NoArgsConstructor 注解中的一个参数，用于强制生成无参构造方法，即使类中存在 final 字段。
>
> - **默认行为（**force = false**）：**
>   - Lombok 不会为包含 final 字段的类生成无参构造方法，因为 final 字段必须在初始化时赋值。
>   - 如果尝试在这种情况下使用 @NoArgsConstructor，会导致编译错误。
>
> - **启用** force = true**：**
>   - Lombok 会强制生成无参构造方法，并将所有 final 字段初始化为默认值（如 null、0、false 等）。

#### (二)、用法

```java
import lombok.NoArgsConstructor;

@NoArgsConstructor(force = true)
public class User {
    private final String name;
    private final int age;
}

===
  
public class User {
    private final String name;
    private final int age;

    public User() {
        this.name = null; // 强制将 name 初始化为 null
        this.age = 0;     // 强制将 age 初始化为默认值 0
    }
}
```

