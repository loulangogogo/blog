# @SpringBootConfiguration

## 概述

@SpringBootConfiguration 是 Spring Boot 提供的一个核心注解，用于标识配置类。它是 @Configuration 的一个特殊变体，主要用于 Spring Boot 应用程序的自动配置。



## 组合注解

- @Configuration



## 用法

```java
@SpringBootConfiguration
public class MyApplication {

    @Bean
    public MyService myService() {
        return new MyService();
    }

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```



## 属性

### 一、proxyBeanMethods

> **[@SpringbootApplication](./@Configuration.md) ==> proxyBeanMethods**
