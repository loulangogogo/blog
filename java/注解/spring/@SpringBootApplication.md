# @SpringBootApplication

## 概述

 Spring Boot 提供的一个核心注解，用于标注应用的主启动类，它是多个注解的组合，能够帮助快速配置和启动 Spring Boot 应用。



## 组合注解

- [@SpringbootConfiguration](./@SpringbootConfiguration.md)
- [@EnableAutoConfiguration](./@EnableAutoConfiguration)
- [@ComponentScan](./@ComponentScan)



## 用法

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MySpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }
}
```



## 属性

### 一、exclude

> **[@EnableAutoConfiguration](./@EnableAutoConfiguration.md) ==> exclude**



### 二、excludeName

> **[@EnableAutoConfiguration](./@EnableAutoConfiguration.md) ==> excludeName**



### 三、scanBasePackages

> **[@ComponenetScan](./@ComponentScan.md) ==> basePackages**



### 四、scanBasePackageClasses

> **[@ComponenetScan](./@ComponentScan.md) ==> basePackageClasses**



### 五、nameGenerator

> **[@ComponenetScan](./@ComponentScan.md) ==> nameGenerator**



### 六、proxyBeanMethods

> **[@SpringbootApplication](./@Configuration.md) ==> proxyBeanMethods**
