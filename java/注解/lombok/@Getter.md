# @Getter

## 概述

@Getter 是 Lombok 提供的注解，用于自动为类的字段生成 **getter 方法**。

1. 如果将 @Getter 注解放在类上，则为类中所有非静态字段生成 getter 方法。
2. 如果将 @Getter 注解放在某个字段上，则只为该字段生成 getter 方法。



## 用法

```java
import lombok.Getter;

@Getter
public class User {
    private String name;
    private int age;
}

===
  
public class User {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```



## 属性

### 一、value

#### (一)、作用

> 在 Lombok 的 @Getter 注解中，参数 AccessLevel value() 用于指定生成的 getter 方法的访问级别。默认值是 AccessLevel.PUBLIC，也就是说，如果不指定，生成的 getter 方法会是 public 的。
>
> | **值**                  | **说明**                                                     |
> | ----------------------- | ------------------------------------------------------------ |
> | `AccessLevel.PUBLIC`    | 默认值，生成 `public` 的 getter 方法，通常用于公开访问字段。 |
> | `AccessLevel.PROTECTED` | 生成 `protected` 的 getter 方法，仅子类和同包类可访问。      |
> | `AccessLevel.PACKAGE`   | 生成包级别访问的 getter 方法（没有显式修饰符）。             |
> | `AccessLevel.PRIVATE`   | 生成 `private` 的 getter 方法，仅类内部可以访问（通常很少使用）。 |
> | `AccessLevel.NONE`      | 不生成 getter 方法。                                         |

#### (二)、用法

```java
import lombok.Getter;
import lombok.AccessLevel;

public class User {
    @Getter(AccessLevel.PROTECTED) // 生成 protected 的 getter 方法
    private String name;

    @Getter(AccessLevel.PACKAGE) // 生成包级别的 getter 方法
    private int age;

    @Getter(AccessLevel.NONE) // 不生成 getter 方法
    private String address;
}

===
  
public class User {
    private String name;
    private int age;
    private String address;

    protected String getName() {
        return name;
    }

    int getAge() { // 包级别访问
        return age;
    }

    // 没有为 address 生成 getter 方法
}
```



### 二、onMethod

#### (一)、作用

> AnyAnnotation[] onMethod() default {}; 是 Lombok 的 @Getter 注解中的参数，用于为生成的 getter 方法添加额外的自定义注解。
>
> 通过 onMethod 参数，可以在由 Lombok 自动生成的 getter 方法上附加一个或多个注解。
>
> 这对于需要向特定框架（如 Spring、Swagger）或工具（如验证框架）提供额外的元数据时非常有用。

#### (二)、用法

```java
import lombok.Getter;

@Getter(onMethod = @__({@Deprecated}))
public class User {
    private String name;
}

===
  
public class User {
    private String name;

    /**
     * @deprecated
     */
    @Deprecated
    public String getName() {
        return name;
    }
}
```



### 三、lazy

#### (一)、作用

> boolean lazy() default false; 是 Lombok 的 @Getter 注解中的一个参数，用于控制生成的 getter 方法是否以**延迟加载（Lazy Initialization）**的方式返回字段值。
>
> 当 lazy = true 时，Lombok 会为非静态、不可变的字段生成一个线程安全的**懒加载**的 getter 方法。
>
> - 如果字段尚未初始化（null），则在第一次调用 getter 时进行初始化。
> - 适合于需要延迟初始化某些占用资源较大的对象，或者需要线程安全的延迟计算场景。

> **使用条件**
>
> 1. 字段必须是 final。
>
> 2. 使用 lazy = true 时，字段的初始化需要通过 Supplier 提供。

#### (二)、用法

```java
import lombok.Getter;

public class User {
    @Getter(lazy = true)
    private final String expensiveResource = initializeResource();

    private String initializeResource() {
        System.out.println("Initializing resource...");
        return "Expensive Resource";
    }
}

===
  
public class User {
    private final java.util.concurrent.atomic.AtomicReference<String> expensiveResource = new java.util.concurrent.atomic.AtomicReference<>();

    public String getExpensiveResource() {
        String result = expensiveResource.get();
        if (result == null) {
            synchronized (expensiveResource) {
                result = expensiveResource.get();
                if (result == null) {
                    result = initializeResource();
                    expensiveResource.set(result);
                }
            }
        }
        return result;
    }

    private String initializeResource() {
        System.out.println("Initializing resource...");
        return "Expensive Resource";
    }
}
```

