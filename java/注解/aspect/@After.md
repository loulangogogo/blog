# @After

## 概述

@After 是 Spring AOP 提供的一个注解，用于定义后置通知（After Advice）。在切点匹配的方法执行完成后（无论是正常返回还是抛出异常）都会执行后置逻辑。相比于其他通知类型，它主要用于处理方法执行后需要的统一清理、日志记录等操作。



## 用法

```java
@Aspect
@Component
public class LoggingAspect {

    @After("execution(* com.example.service.*.*(..))")
    public void logAfterMethod() {
        System.out.println("Method executed");
    }
}
```



## 属性

### 一、value

> **[@Pointcut](./@Pointcut.md) ==> value**



### 二、argNames

> **[@Pointcut](./@Pointcut.md) ==> argNames**
