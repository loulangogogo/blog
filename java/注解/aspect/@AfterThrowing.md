# @AfterThrowing

## 概述

@AfterThrowing 是 Spring AOP 中用于捕获目标方法抛出异常的增强注解，它允许在目标方法抛出指定异常时执行特定的逻辑。



## 用法

```java
@Aspect
@Component
public class ExceptionAspect {

    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "ex")
    public void handleException(Exception ex) {
        System.out.println("Exception caught: " + ex.getMessage());
    }
}
```



## 属性

### 一、value

> **[@Pointcut](./@Pointcut.md) ==> value**



### 二、argNames

> **[@Pointcut](./@Pointcut.md) ==> argNames**



### 三、pointcut

> [@AfterReturning](./@AfterReturning.md) ==> pointcut



### 四、throwing

#### (一)、作用

> 在 @AfterThrowing 注解中，throwing 属性的类型是 String，它指定了增强方法中的参数名，该参数用于接收目标方法抛出的异常对象。

#### (二)、用法

```java
@Aspect
@Component
public class ExceptionAspect {

    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "exception")
    public void logException(Exception exception) {
        System.out.println("Exception occurred: " + exception.getMessage());
    }
}
```

