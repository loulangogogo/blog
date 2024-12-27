# @AfterReturning

## 概述

@AfterReturning 是 Spring AOP 提供的一种通知类型，用于定义后置返回通知（After Returning Advice）。它会在切点方法**正常返回结果后**执行，主要用于获取返回值并进行额外的逻辑处理，例如日志记录、结果转换等。

## 用法

```java
@Aspect
@Component
public class LoggingAspect {

    @AfterReturning(
        pointcut = "execution(* com.example.service.*.*(..))",
        returning = "result"
    )
    public void logAfterReturning(Object result) {
        System.out.println("Method returned value is : " + result);
    }
}
```



## 属性

### 一、value

> **[@Pointcut](./@Pointcut.md) ==> value**



### 二、argNames

> **[@Pointcut](./@Pointcut.md) ==> argNames**



### 三、pointcut

#### (一)、作用

> 用于引用已有的切点方法。
>
> 它和value是互斥的。

#### (二)、用法

```java
@Aspect
@Component
public class LoggingAspect {

    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}
}
@Aspect
@Component
public class MonitoringAspect {

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void afterReturningAdvice(Object result) {
        System.out.println("Method returned: " + result);
    }
}
```



### 三、returning

#### (一)、作用

> @AfterReturning 的 returning 属性用于指定一个变量名，来捕获目标方法的返回值，以便在通知方法中使用。

#### (二)、用法

```java
@Aspect
@Component
public class LoggingAspect {

    @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
    public void logAfterReturning(Object result) {
        System.out.println("Method returned: " + result);
    }
}
```

