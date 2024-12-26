# @Aspect

## 概述

**@Aspect** 是 Spring AOP（面向切面编程）的核心注解，用于定义一个类为切面类。切面类包含切面逻辑，用于处理应用程序中的横切关注点（如日志记录、事务管理等）。



## 用法

```java
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    // 定义切点
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}

    // 在方法执行之前执行
    @Before("serviceMethods()")
    public void logBefore() {
        System.out.println("Before executing method");
    }

    // 在方法执行之后执行
    @After("serviceMethods()")
    public void logAfter() {
        System.out.println("After executing method");
    }

    // 在方法返回后执行
    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterReturning(Object result) {
        System.out.println("Method returned: " + result);
    }

    // 在方法抛出异常时执行
    @AfterThrowing(pointcut = "serviceMethods()", throwing = "ex")
    public void logAfterThrowing(Exception ex) {
        System.out.println("Exception thrown: " + ex.getMessage());
    }
}
```

