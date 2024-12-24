# @Configuration

## 概述

@Configuration 是 Spring Framework 的核心注解之一，主要用于标识配置类。在 Spring 应用中，它是定义 Spring 容器中 Bean 和配置元数据的基础方式。

使用 @Configuration 标注的类被视为 Java 配置类，类似于传统的 XML 配置文件。



## 组合注解

- @Component



## 用法

```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }

    @Bean
    public MyRepository myRepository() {
        return new MyRepository();
    }
}
```





## 属性

### 一、value

> **[@Component](./@Component.md) ==> value**



### 二、proxyBeanMethods

#### (一)、作用

> - 当设置为 true 时，Spring 会为配置类生成 CGLIB 代理，以确保 @Bean 方法返回的 Bean 是单例的，即即使多次调用同一个 @Bean 方法，也会返回相同的实例。
> - 当设置为 false 时，Spring 不会使用代理，每次调用 @Bean 方法时都会创建一个新的实例。

#### (二)、用法

- proxyBeanMethods = true

```java
@Configuration
public class MyApp {

    @Bean
    public ServiceA serviceA() {
        return new ServiceA(serviceB());
    }

    @Bean
    public ServiceB serviceB() {
        return new ServiceB();
    }
}
```

- proxyBeanMethods = false

```java
@Configuration(proxyBeanMethods = false)
public class MyApp {

    @Bean
    public ServiceA serviceA() {
        return new ServiceA(serviceB());
    }

    @Bean
    public ServiceB serviceB() {
        return new ServiceB();
    }
}
```



