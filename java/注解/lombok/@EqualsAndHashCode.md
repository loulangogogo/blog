# @EqualsAndHashCode

## 概述

@EqualsAndHashCode 是 Lombok 提供的一个注解，用于自动生成 equals() 和 hashCode() 方法。它会基于类的字段自动计算对象的相等性和哈希值，从而简化开发工作。

1. **自动生成** equals() **方法**

   判断两个对象是否相等，比较逻辑基于类中的字段。

2. **自动生成** hashCode() **方法**

   返回对象的哈希值，计算逻辑基于类中的字段。

3. **可以指定哪些字段参与比较或排除**

   使用注解参数 of 或 exclude 来控制。



## 用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class User {
    private String name;
    private int age;
}
```

等价于

```java
public class User {
    private String name;
    private int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```



## 属性

### 一、exclude

#### (一)、作用

> String[] exclude() 是 Lombok 的 @EqualsAndHashCode 注解中的一个参数，用于指定在生成 equals() 和 hashCode() 方法时，**排除**某些字段的参与。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(exclude = {"age", "address"})
public class User {
    private String name;
    private int age;
    private String address;
}

等价于
  
public class User {
    private String name;
    private int age;
    private String address;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
```



### 二、callSuper

#### (一)、作用

> 在 **Lombok** 的 @EqualsAndHashCode 注解中，boolean callSuper() default false; 是一个参数，用于指定在生成 equals() 和 hashCode() 方法时，是否调用父类的 equals() 和 hashCode() 方法。
>
> 如果当前类是一个子类，并且需要将父类的字段也纳入 equals() 和 hashCode() 的比较逻辑中，就可以将 callSuper 设置为 true。
>
> - callSuper = false**（默认）**：只基于当前类的字段生成 equals() 和 hashCode()。
> - callSuper = true：当前类的 equals() 和 hashCode() 方法会调用父类的 equals() 和 hashCode() 方法。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class Child extends Parent {
    private String childField;
}

class Parent {
    private String parentField;
}

===
  
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Child child = (Child) o;
    return Objects.equals(childField, child.childField); // 只比较当前类的字段
}

@Override
public int hashCode() {
    return Objects.hash(childField); // 只基于当前类的字段生成哈希值
}
```



### 三、of

#### (一)、作用

> String[] of() 是 Lombok @EqualsAndHashCode 注解中的一个参数，用于指定生成 equals() 和 hashCode() 方法时，**仅包含**某些字段进行比较。
>
> 和 exclude 相反，of 提供了一个字段白名单机制，只有在 of 中指定的字段才会被用来计算 equals() 和 hashCode()。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(of = {"name", "age"})
public class User {
    private String name;
    private int age;
    private String address;
}

===
  
public class User {
    private String name;
    private int age;
    private String address;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```



### 四、doNotUseGetters

#### (一)、作用

> boolean doNotUseGetters() default false; 是 Lombok 的 @EqualsAndHashCode 注解中的参数，用于指定在生成 equals() 和 hashCode() 方法时，是否直接访问字段，**而不通过 getter 方法**。
>
> 1. false**（默认行为）**
>
> 当需要确保 equals() 和 hashCode() 的逻辑与 getter 方法保持一致时。例如，如果 getter 方法中包含了某些逻辑（如懒加载、转换等），调用 getter 方法更符合业务逻辑。
>
> 2. true**（不使用 getter 方法）**
>
> 如果字段的 getter 方法有额外的逻辑，且这些逻辑不适合在 equals() 或 hashCode() 中调用时，可以将此值设置为 true。这种方式也可以提高性能，因为直接访问字段避免了方法调用。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class User {
    private String name;

    public String getName() {
        System.out.println("Getter called");
        return name;
    }
}

===

@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return Objects.equals(getName(), user.getName()); // 调用 getter 方法
}

@Override
public int hashCode() {
    return Objects.hash(getName()); // 调用 getter 方法
}
```



### 五、CacheStrategy

#### (一)、作用

> CacheStrategy 是 Lombok 的 @EqualsAndHashCode 注解中的一个内部枚举，用于控制是否为生成的 hashCode() 方法引入缓存机制，从而优化重复调用的性能。
>
> 默认情况下，cacheStrategy 的值是 EqualsAndHashCode.CacheStrategy.NEVER，即 hashCode() 方法每次调用时都会重新计算，而不会缓存结果。
>
> **Lombok 提供了以下三种缓存策略：**
>
> 1. NEVER**（默认）**
>    - 不使用缓存，每次调用 hashCode() 都会重新计算。
>    - 推荐用于字段值可能经常发生变化的对象，或者对象生命周期较短的情况。
>
> 2. LAZY
>    - 使用懒加载方式缓存 hashCode 的计算结果。
>    - hashCode() 会在第一次调用时计算并缓存结果，后续调用直接返回缓存的值。
>    - 适用于字段值固定不变（通常是不可变对象）的情况，能提高性能。
>
> 3. ALWAYS
>    - 在对象创建时立刻计算并缓存 hashCode 的值（非懒加载）。
>    - 适合在初始化时可以确定字段值永不改变的对象（例如常量类）。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(cacheStrategy = EqualsAndHashCode.CacheStrategy.LAZY)
public class User {
    private String name;
    private int age;
}

===
  
//生成的代码会增加一个缓存变量 _hashCode，并在第一次调用时计算：
private transient int _hashCode; // 缓存 hashCode
private transient boolean _hashCodeComputed; // 是否已计算

@Override
public int hashCode() {
    if (!_hashCodeComputed) {
        _hashCode = Objects.hash(name, age);
        _hashCodeComputed = true;
    }
    return _hashCode;
}
```



### 六、onParam

#### (一)、作用

> AnyAnnotation[] onParam() default {}; 是 Lombok 中 @EqualsAndHashCode 注解的参数之一，专用于在生成的 equals() 和 hashCode() 方法中，为方法参数添加额外的注解。
>
> onParam 参数允许你在由 Lombok 生成的 equals() 和 hashCode() 方法的**方法参数**上，添加自定义注解。
>
> 在某些特定环境（如框架或工具集成）中，可能需要为方法参数添加注解以满足功能需求。例如：
>
> - **注解工具集成**：如静态分析工具、验证框架等。
> - **防止工具误报**：如对 null 的静态检查。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(onParam = {@__({@NonNull})})
public class User {
    private String name;
    private int age;
}

===
  
@Override
public boolean equals(@NonNull Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return age == user.age && Objects.equals(name, user.name);
}
```



### 七、onlyExplicitlyIncluded

#### (一)、作用

> boolean onlyExplicitlyIncluded() default false; 是 Lombok 的 @EqualsAndHashCode 注解中的一个参数，用于控制生成 equals() 和 hashCode() 方法时，是否**只基于显式标记的字段或方法**。
>
> 默认情况下，onlyExplicitlyIncluded 的值是 false，即 equals() 和 hashCode() 方法会基于所有非静态、非瞬态的字段生成比较逻辑，除非你通过 exclude 参数排除了某些字段。
>
> 当 onlyExplicitlyIncluded 设置为 true 时，Lombok 只会生成基于显式标记为 @EqualsAndHashCode.Include 的字段或方法的 equals() 和 hashCode() 方法。
>
> 这在需要精确控制参与 equals() 和 hashCode() 逻辑的字段时非常有用。

#### (二)、用法

```java
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {
    @EqualsAndHashCode.Include
    private String name;

    @EqualsAndHashCode.Include
    private int age;

    private String address; // 未显式标记，不会参与
}

===
  
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return age == user.age &&
           Objects.equals(name, user.name); // 仅显式标记的字段参与
}

@Override
public int hashCode() {
    return Objects.hash(name, age); // 仅显式标记的字段参与
}
```

