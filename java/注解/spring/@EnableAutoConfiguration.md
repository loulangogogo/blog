# @EnableAutoConfiguration

## 概述

@EnableAutoConfiguration 是 Spring Boot 中一个重要的注解，通常用于标记一个配置类，告知 Spring Boot 根据当前类路径下的依赖和项目的配置，自动配置 Spring 应用的功能。它是 Spring Boot 自动配置机制的核心部分。



## 组合注解

- @AutoConfigurationPackage



## 用法

```java
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.example")
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```



## 属性

### 一、exclude

#### (一)、作用

> 过提供一个或多个自动配置类的 Class 对象，阻止 Spring Boot 自动加载这些配置。

#### (二)、用法

```java
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
public class MyApp {
}
```



### 二、excludeName

#### (一)、作用

> 通过指定自动配置类的全限定名（字符串形式）来排除自动配置。这在你无法直接引用目标配置类的情况下特别有用，比如目标类在编译时不可用。

#### (二)、用法

```java
@EnableAutoConfiguration(
    excludeName = {
        "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration",
        "org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
    }
)
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```

