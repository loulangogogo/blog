# @Import

## 概述

@Import 是 Spring Framework 提供的一个注解，用于将其他配置类或组件导入到当前的 Spring 应用上下文中。它是一种显式的依赖注入方式，用来加载和组合配置，从而增强应用的模块化和可扩展性。



## 用法

```java
@Configuration
public class AppConfig {
    @Bean
    public String appBean() {
        return "AppConfig Bean";
    }
}

@Configuration
@Import(AppConfig.class)
public class MainConfig {
    @Bean
    public String mainBean() {
        return "MainConfig Bean";
    }
}
```



## 属性

### 一、value

#### (一)、作用

> 在 Spring 的 @Import 注解中，Class<?>[] value() 属性指定需要导入的配置类或组件的类型。使用 value 属性，可以显式地声明一组类，这些类会被 Spring 的容器加载并注册到当前的应用上下文中。

#### (二)、用法

```java
@Configuration
public class AppConfig {
    @Bean
    public String appBean() {
        return "App Bean";
    }
}

@Configuration
@Import(AppConfig.class)
public class MainConfig {
}
```



