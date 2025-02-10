# @Before

## 概述

@Before 是 Spring AOP 提供的注解之一，用于定义一个通知（Advice），表示在目标方法（切点）执行之前运行相应的方法。它是切面编程（Aspect-Oriented Programming, AOP）中的一种核心功能，广泛应用于日志记录、权限检查、性能监控等场景。



## 用法

```java
@Aspect
public class MyAspect {

    @Pointcut(value = "execution(* com.example..*(..)) && args(param1, param2)", argNames = "param1,param2")
    public void myPointcut(String param1, Integer param2) {
        // 切点定义，匹配方法有两个参数，第一个为 String，第二个为 Integer 的方法。
    }

    @Before(value = "myPointcut(param1, param2)", argNames = "param1,param2")
    public void beforeAdvice(String param1, Integer param2) {
        System.out.println("Before advice called with param1: " + param1 + ", param2: " + param2);
    }
}
```



## 属性

### 一、value

> **[@Pointcut](./@Pointcut.md) ==> value**



### 二、argNames

> **[@Pointcut](./@Pointcut.md) ==> argNames**
