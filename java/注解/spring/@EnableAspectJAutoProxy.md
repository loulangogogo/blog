# @EnableAspectJAutoProxy

## 概述

@EnableAspectJAutoProxy 是一个 Spring 注解，用于启用基于 AspectJ 的 AOP（面向切面编程）功能。通过它，Spring 可以扫描并解析使用 @Aspect 定义的切面类，实现方法拦截与增强。



## 用法

```java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
}
```



## 属性

### 一、proxyTargetClass

#### (一)、作用

> proxyTargetClass() 是 @EnableAspectJAutoProxy 注解中的一个属性，定义了是否强制使用 CGLIB 动态代理来创建代理对象。
>
> 1. **JDK 动态代理**（默认行为）：
>    - 如果 proxyTargetClass 为 false，Spring 会优先选择 JDK 动态代理。
>    - 代理对象必须实现目标类的接口。
>    - JDK 动态代理的性能稍高于 CGLIB，且没有额外的字节码生成成本。
>
> 2. **CGLIB 动态代理**：
>    - 如果目标类没有实现接口，Spring 自动使用 CGLIB 动态代理。
>    - 当 proxyTargetClass 设置为 true 时，无论目标类是否实现接口，Spring 都会强制使用 CGLIB 代理。
>    - CGLIB 代理通过继承目标类实现，无法代理 final 类或 final 方法。

#### (二)、用法

```java
@EnableAspectJAutoProxy(proxyTargetClass = false) // 默认值
public class AppConfig {
}
```





### 二、exposeProxy

#### (一)、作用

> exposeProxy() 是 @EnableAspectJAutoProxy 注解中的一个属性，用于控制是否在当前线程中暴露代理对象。
>
> 1. **代理对象暴露的作用**：
>    - 在某些场景下，目标对象的内部方法调用也需要通过代理进行 AOP 拦截。
>    - 如果 exposeProxy = true，可以通过 AopContext.currentProxy() 获取当前代理对象，并通过该代理对象调用方法，从而触发 AOP 切面逻辑。
>
> 2. **常见问题**：
>    - 如果 exposeProxy = false 且内部方法直接调用自身的方法，AOP 切面逻辑不会生效。
>    - 默认情况下，代理对象不会被暴露，以避免额外的性能开销。

#### (二)、用法

```java
@EnableAspectJAutoProxy(exposeProxy = true)
public class AppConfig {
}
```

