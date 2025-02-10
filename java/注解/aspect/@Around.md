# @Around

## 概述

@Around 是 Spring AOP 提供的一个注解，用于定义环绕通知（Around Advice）。它允许在目标方法（切点）执行之前和之后分别插入自定义逻辑，并且能够完全控制目标方法是否执行以及如何执行。



## 用法

```java
@Aspect
@Component
public class PerformanceAspect {

    @Around("execution(* com.example.service.*.*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed(); // 执行目标方法
        long elapsedTime = System.currentTimeMillis() - start;

        System.out.println("Method executed in: " + elapsedTime + "ms");
        return result; // 返回目标方法的结果
    }
}
```



## 属性

### 一、value

> **[@Pointcut](./@Pointcut.md) ==> value**



### 二、argNames

> **[@Pointcut](./@Pointcut.md) ==> argNames**

