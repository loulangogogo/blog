# @AutoConfigurationPackage

## 概述

@AutoConfigurationPackage 是 Spring Boot 中的一个注解，用于标记配置类以自动配置包扫描路径。它主要与 @EnableAutoConfiguration 配合使用，简化开发者手动设置组件扫描路径的工作。



## 用法

```java
@Configuration
@AutoConfigurationPackage
public class MyConfiguration {
}
```



## 属性

### 一、basePackages

#### (一)、作用

> 指定组件扫描的基础包路径，Spring 会扫描这些包及其子包中的所有组件（标注了 @Component, @Service, @Repository, @Controller 等的类），并将它们注册为 Bean。

#### (二)、用法

```java
@AutoConfigurationPackage(scanBasePackages = {"com.example.myapp", "com.example.other"})
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```



### 二、basePackageClasses

#### (一)、作用

> 通过指定一个或多个类，确定其所在的包路径作为组件扫描的基础包。Spring 会扫描这些包及其子包中的组件（标注了 @Component, @Service, @Repository, @Controller 等的类）。

#### (二)、用法

```java
@AutoConfigurationPackage(scanBasePackageClasses = {MyService.class, MyRepository.class})
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```

