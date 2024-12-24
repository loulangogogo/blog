# @Component

## 概述

@Component 是 Spring 框架中的一个注解，用于表明一个类是一个 Spring 管理的组件（bean）。它的主要功能是通过 Spring 的组件扫描机制，将标注的类自动注册为应用上下文中的 Bean。



## 用法

```java
@Component
public class MyService {
    public void serve() {
        System.out.println("Service is running...");
    }
}
```



## 属性

### 一、value

#### (一)、作用

> 它允许为配置类指定一个显式的 Spring Bean 名称。默认情况下，如果 value 没有被设置，则 Spring 会基于类名生成一个默认的 Bean 名称（例如，将类名的首字母小写）。

#### (二)、用法

```java
@Component("myConfig")
public class AppConfig {
  
}
```

